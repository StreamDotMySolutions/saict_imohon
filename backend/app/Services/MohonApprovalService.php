<?php
namespace App\Services;

use App\Models\MohonApproval;

class MohonApprovalService
{

    public static function storeStep1($request, $mohonRequestId)
    {
        //\Log::info($request);
        $user =  auth('sanctum')->user();
        return MohonApproval::create([
            'mohon_request_id' => $mohonRequestId,
            'user_id' => $user->id, // User
            'step' => 1,
            'status' => 'pending'
        ]);
    }

    public static function storeStep2($request, $mohonRequestId)
    {
        $user =  auth('sanctum')->user();
        return MohonApproval::create([
            'mohon_request_id' => $mohonRequestId,
            'user_id' => $user->id, // Manager
            'step' => 2,
            'status' => $request->input('status')
        ]);
    }
}