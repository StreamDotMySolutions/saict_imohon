<?php
namespace App\Services;

use App\Models\MohonDistributionApproval;
use App\Models\MohonDistributionRequest;
use App\Models\MohonDistributionDelivery;
use App\Models\User;
use App\Mail\AgihanNotification;
use Illuminate\Support\Facades\Mail;

class MohonDistributionApprovalService
{

    public static function checkIfExists($mohonDistributionRequestId)
    {
        $record = MohonDistributionRequest::find($mohonDistributionRequestId);
        // Check if the record exists
        if ($record) {
            // ID exists
            return true;
        } else {
            // ID does not exist
            return false;
        }
    }

    public static function storeStep0($mohonDistributionRequestId)
    {
    
        if ( self::checkIfExists($mohonDistributionRequestId)){
            $user =  auth('sanctum')->user();
            return MohonDistributionApproval::create([
                'mohon_distribution_request_id' => $mohonDistributionRequestId, // belongsTo MohonDistributionRequest
                'user_id' => $user->id, // role is User
                'step' => 0, // initial step is 0
                'status' => 'pending', // status is pending
                'message' => "Admin membuat Agihan"
            ]);
        } else {
            return false;
        }
    }

    // Admin requesting Agihan Approval from Boss
    public static function storeByAdmin($request,$mohonDistributionRequestId)
    {

        if ( !self::checkIfExists($mohonDistributionRequestId) ) return false;

        $user =  auth('sanctum')->user();
        $approval = MohonDistributionApproval::create([
            'mohon_distribution_request_id' => $mohonDistributionRequestId,
            'user_id' => $user->id, // role is Admin
            'boss_id' => $request->input('boss_id'), // which pelulus 2 ?
            'step' => 1, // upgrade from 0 to 1
            'status' => 'pending', // status is pending
            'message' => $request->input('message') // admin key in justifikasi as message
        ]);

        // Send email to boss
        $boss = User::find($request->input('boss_id'));
        if ($boss) {
            $agihan = MohonDistributionRequest::find($mohonDistributionRequestId);
            $data = [
                'name'         => $boss->name,
                'admin_name'   => $user->name,
                'admin_email'  => $user->email,
                'reference_no' => $agihan->reference_no ?? '#' . $mohonDistributionRequestId,
                'message'      => $request->input('message'),
                'system_url'   => env('FRONTEND_URL', config('app.url')),
                'date'         => now()->translatedFormat('d F Y'),
                'role'         => 'boss_pending',
            ];
            try {
                Mail::to($boss->email)->send(new AgihanNotification($data));
            } catch (\Exception $e) {
                \Log::warning('Mail failed: ' . $e->getMessage());
            }
        }

        return $approval;
    }

    // Boss processing Agihan Request from Admin
    public static function storeByBoss($request, $mohonDistributionRequestId)
    {

        if ( !self::checkIfExists($mohonDistributionRequestId) ) return false;

        $user =  auth('sanctum')->user();
        $status = $request->input('status');

        // role=boss
        // create new record with step=2
        $approval = MohonDistributionApproval::create([
            'mohon_distribution_request_id' => $mohonDistributionRequestId,
            'user_id' => $user->id, // role is Boss
            'step' => 2, // upgrade from 1 to 2
            'boss_id' =>  $user->id, // role is Boss
            'status' => $status, // status
            'message' => $request->input('message') // justifikasi
        ]);

        // Send email to all admins
        $agihan = MohonDistributionRequest::find($mohonDistributionRequestId);
        $role   = $status === 'approved' ? 'admin_agihan_approved' : 'admin_agihan_rejected';
        $admins = User::role('admin')->get();
        foreach ($admins as $admin) {
            $data = [
                'name'         => $admin->name,
                'boss_name'    => $user->name,
                'reference_no' => $agihan->reference_no ?? '#' . $mohonDistributionRequestId,
                'message'      => $request->input('message'),
                'system_url'   => env('FRONTEND_URL', config('app.url')),
                'date'         => now()->translatedFormat('d F Y'),
                'role'         => $role,
            ];
            try {
                Mail::to($admin->email)->send(new AgihanNotification($data));
            } catch (\Exception $e) {
                \Log::warning('Mail failed: ' . $e->getMessage());
            }
        }

        return $approval;
    }

}