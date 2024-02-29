<?php
namespace App\Services;

use App\Models\MohonApproval;

class MohonApprovalService
{

    public static function storeByUser($request, $mohonRequestId)
    {
        //\Log::info($request);
        $user =  auth('sanctum')->user();
        return MohonApproval::create([
            'mohon_request_id' => $mohonRequestId,
            'user_id' => $user->id, // User
            'step' => 1, // step 1 is for user requesting from manager
            'status' => 'pending'
        ]);
    }

    public static function storeByManager($request, $mohonRequestId)
    {
        // role = manager managing the request
        // step = 1
        $user =  auth('sanctum')->user();
        $approval = MohonApproval::create([
            'mohon_request_id' => $mohonRequestId,
            'user_id' => $user->id, // Manager
            'step' => 2, // 2 is for manager managing
            'status' => $request->input('status')
        ]);

        // if status == approved
        // create step3 with pending status
        if( $request->input('status') == 'approved'){
            return MohonApproval::create([
                'mohon_request_id' => $mohonRequestId,
                'user_id' => $user->id, // Manager
                'step' => 3, // step 3 is for admin maanaging
                'status' => 'pending' // pending
            ]);
        } else {
            return $approval;
        }
  

    }

    public static function storeStep3($request, $mohonRequestId)
    {
        $user =  auth('sanctum')->user();
        return MohonApproval::create([
            'mohon_request_id' => $mohonRequestId,
            'user_id' => $user->id, // Admin
            'step' => 3,
            'status' => $request->input('status')
        ]);
    }

    public static function storeStep4($request, $mohonRequestId)
    {
        $user =  auth('sanctum')->user();
        return MohonApproval::create([
            'mohon_request_id' => $mohonRequestId,
            'user_id' => $user->id, // Boss
            'step' => 4,
            'status' => $request->input('status')
        ]);
    }
}