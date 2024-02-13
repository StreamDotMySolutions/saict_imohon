<?php
namespace App\Services;

use App\Models\MohonApproval;

class MohonApprovalService
{

    public static function store($request, $mohonRequestId)
    {
        //\Log::info($request);
        $user =  auth('sanctum')->user();
        return MohonApproval::create([
            'mohon_request_id' => $mohonRequestId,
            'user_id' => $user->id,
            'step' => $request->input('step'),
            'status' => 'pending'
        ]);
    }
}