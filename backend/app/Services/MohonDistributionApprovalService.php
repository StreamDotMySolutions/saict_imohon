<?php
namespace App\Services;

use App\Models\MohonDistributionApproval;

class MohonDistributionApprovalService
{

    public static function storeStep0($mohonDistributionRequestId)
    {
        //\Log::info($request);
        $user =  auth('sanctum')->user();
        return MohonDistributionApproval::create([
            'mohon_distribution_request_id' => $mohonDistributionRequestId,
            'user_id' => $user->id, // role is User
            'step' => 0, // initial steap
            'status' => 'pending' // status is pending
        ]);
    }

    public static function storeStep1($mohonDistributionRequestId)
    {
        //\Log::info($request);
        $user =  auth('sanctum')->user();
        return MohonDistributionApproval::create([
            'mohon_distribution_request_id' => $mohonDistributionRequestId,
            'user_id' => $user->id, // role is Admin
            'step' => 1, // upgrade from 0 to 1
            'status' => 'pending' // status is pending
        ]);
    }

}