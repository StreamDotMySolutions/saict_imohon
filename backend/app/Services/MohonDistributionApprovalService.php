<?php
namespace App\Services;

use App\Models\MohonDistributionApproval;
use App\Models\MohonDistributionRequest;

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
        //\Log::info($request);
        if ( self::checkIfExists($mohonDistributionRequestId)){
        $user =  auth('sanctum')->user();
            return MohonDistributionApproval::create([
                'mohon_distribution_request_id' => $mohonDistributionRequestId,
                'user_id' => $user->id, // role is User
                'step' => 0, // initial steap
                'status' => 'pending' // status is pending
            ]);
        } else {
            return false;
        }
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