<?php
namespace App\Services;

use App\Models\MohonRequest;
use App\Models\MohonApproval;
use App\Models\User;
use App\Mail\MohonNotification;
use Illuminate\Support\Facades\Mail;

class MohonApprovalService
{
    // role = user requesting from Manager
    // step = 1

    public static function storeByUser($request, $mohonRequestId)
    {
        //\Log::info($request);
        
        $user =  auth('sanctum')->user();

        // update existing mohonRequest
        MohonRequest::where('id',$mohonRequestId)->update([
            'status' => 'pending',
            'step' => 1,
            'approver_id' => $request->input('manager_id') 
        ]);

        // create record in MohonApproval for record keeping
        $approval = MohonApproval::create([
            'mohon_request_id' => $mohonRequestId,
            'user_id' => $user->id, // User that requesting approval to manager ( pelulus 1 )
            'requester_id' =>  $user->id, // User that requesting approval to manager ( pelulus 1 )
            'approver_id' =>  $request->input('manager_id'), // the one who will approve the request
            'manager_id' => $request->input('manager_id'), // which manager


            'step' => 1, // step 1 is for user requesting from manager
            'status' => 'pending',
            'message' => "{$user->name} ( User ) membuat permohonan ke Pelulus 1",
        ]);

        // send email to manager
        $manager = User::where('id', $request->input('manager_id'))->first();
        if ($manager) {
            $mohon = MohonRequest::find($mohonRequestId);
            $data = [
                'name'           => $manager->name,
                'requester_name' => $user->name,
                'requester_email'=> $user->email,
                'reference_no'   => $mohon->reference_no ?? '#' . $mohonRequestId,
                'system_url'     => env('FRONTEND_URL', config('app.url')),
                'date'           => now()->translatedFormat('d F Y'),
                'role'           => 'manager',
            ];
            Mail::to($manager->email)->send(new MohonNotification($data));
        }

        return $approval;
    }

    public static function storeByManager($request, $mohonRequestId)
    {
        // role = manager managing the request
        // if approved, requesting to Admin
        // step = 1
        $user =  auth('sanctum')->user();


        // update step 1
        // find the id with status ='pending' and mohon_request_id = $mohonRequestId
        // $prevApproval = MohonApproval::query()
        //                         ->where('step',1)
        //                         ->where('mohon_request_id',$mohonRequestId)
        //                         ->where('status','pending')
        //                         ->first();
    
        // //\Log::info($prevApproval);
        // // Check if a record was found
        // if ($prevApproval) {
        //     // Update the status of the retrieved record to 'approved'
        //     $prevApproval->update([
        //         'status' => 'approved',
        //     ]);
        // }

        // update MohonRequest 
        MohonRequest::where('id',$mohonRequestId)->update([
            'status' => $request->input('status'), //either approved or rejected
            'step' => 2, // step 2 = role  pelulus-1
            'approver_id' => $user->id, // Manager
        ]);

        // create step 2
        $approval = MohonApproval::create([
            'mohon_request_id' => $mohonRequestId,
            'user_id' => $user->id, // Manager
            
            'approver_id' =>  $user->id, // the one who approve / reject the request
            'requester_id' =>  $user->id, // User that requesting approval to manager ( pelulus 1 )
            'manager_id' =>  $user->id, // User that requesting approval to manager ( pelulus 1 )
           
            'step' => 2, // 2 is for manager managing
            'status' => $request->input('status'), // status
            'message' => $request->input('message') // message by pelulus-1
        ]);

        // if status == approved
        // create step3 with pending status
        if( $request->input('status') == 'approved'){

            MohonRequest::where('id',$mohonRequestId)->update([
                'status' => 'pending', //either approved or rejected
                'step' => 3, // step 2 = role  pelulus-1
                //'approver_id' => $user->id, // requesting  ANY admin
            ]);

            $step3 = MohonApproval::create([
                'mohon_request_id' => $mohonRequestId,
                'user_id' => $user->id, // Manager

                'requester_id' =>  $user->id, // User that requesting approval to manager ( pelulus 1 )
                'manager_id' =>  $user->id, // User that requesting approval to manager ( pelulus 1 )
                'message' => "{$user->name} ( Pelulus 1 ) membuat permohonan ke Admin",
                'step' => 3, // step 3 is for admin maanaging
                'status' => 'pending' // pending
            ]);

            // notify all admins
            $mohon = MohonRequest::with('user')->find($mohonRequestId);
            $admins = User::whereHas('roles', fn($q) => $q->where('name', 'admin'))->get();
            foreach ($admins as $admin) {
                $data = [
                    'name'           => $admin->name,
                    'requester_name' => $mohon->user->name ?? '-',
                    'requester_email'=> $mohon->user->email ?? '-',
                    'reference_no'   => $mohon->reference_no ?? '#' . $mohonRequestId,
                    'manager_name'   => $user->name,
                    'system_url'     => env('FRONTEND_URL', config('app.url')),
                    'date'           => now()->translatedFormat('d F Y'),
                    'role'           => 'admin',
                ];
                Mail::to($admin->email)->send(new MohonNotification($data));
            }

            return $step3;
        } else {
            // notify requester of rejection
            $mohon = MohonRequest::with('user')->find($mohonRequestId);
            if ($mohon && $mohon->user) {
                $data = [
                    'name'           => $mohon->user->name,
                    'requester_name' => $mohon->user->name,
                    'requester_email'=> $mohon->user->email,
                    'reference_no'   => $mohon->reference_no ?? '#' . $mohonRequestId,
                    'manager_name'   => $user->name,
                    'system_url'     => env('FRONTEND_URL', config('app.url')),
                    'date'           => now()->translatedFormat('d F Y'),
                    'role'           => 'requester_rejected',
                    'message'        => $request->input('message'),
                ];
                Mail::to($mohon->user->email)->send(new MohonNotification($data));
            }
            return $approval;
        }
  

    }

    public static function storeByAdmin($request, $mohonRequestId)
    {
        // role = Admin managing the request
        // step = 3 → 4
        $user = auth('sanctum')->user();
        $status = $request->input('status'); // 'approved' or 'rejected'

        MohonRequest::where('id', $mohonRequestId)->update([
            'status'      => $status,
            'step'        => 4,
            'approver_id' => $user->id,
            'admin_id'    => $user->id,
        ]);

        $approval = MohonApproval::create([
            'mohon_request_id' => $mohonRequestId,
            'user_id'          => $user->id,
            'requester_id'     => $user->id,
            'approver_id'      => $user->id,
            'admin_id'         => $user->id,
            'step'             => 4,
            'message'          => $request->input('message'),
            'status'           => $status,
        ]);

        // Find requester and the manager who approved at step=2
        $mohon = MohonRequest::with('user')->find($mohonRequestId);
        $managerApproval = MohonApproval::where('mohon_request_id', $mohonRequestId)
            ->where('step', 2)
            ->with('user')
            ->first();
        $manager = $managerApproval?->user;

        $baseData = [
            'requester_name'  => $mohon->user->name ?? '-',
            'requester_email' => $mohon->user->email ?? '-',
            'reference_no'    => $mohon->reference_no ?? '#' . $mohonRequestId,
            'admin_name'      => $user->name,
            'system_url'      => env('FRONTEND_URL', config('app.url')),
            'date'            => now()->translatedFormat('d F Y'),
            'message'         => $request->input('message'),
        ];

        // Notify requester (user)
        if ($mohon->user) {
            $roleUser = $status === 'approved' ? 'user_admin_approved' : 'user_admin_rejected';
            Mail::to($mohon->user->email)->send(new MohonNotification(array_merge($baseData, [
                'name' => $mohon->user->name,
                'role' => $roleUser,
            ])));
        }

        // Notify manager
        if ($manager) {
            $roleManager = $status === 'approved' ? 'manager_admin_approved' : 'manager_admin_rejected';
            Mail::to($manager->email)->send(new MohonNotification(array_merge($baseData, [
                'name' => $manager->name,
                'role' => $roleManager,
            ])));
        }

        return $approval;
    }

    // public static function storeStep4($request, $mohonRequestId)
    // {
    //     $user =  auth('sanctum')->user();
    //     return MohonApproval::create([
    //         'mohon_request_id' => $mohonRequestId,
    //         'user_id' => $user->id, // Boss
    //         'step' => 4,
    //         'status' => $request->input('status')
    //     ]);
    // }
}