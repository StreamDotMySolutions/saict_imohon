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
    
        if ( self::checkIfExists($mohonDistributionRequestId)){
            $user =  auth('sanctum')->user();
            return MohonDistributionApproval::create([
                'mohon_distribution_request_id' => $mohonDistributionRequestId, // belongsTo MohonDistributionRequest
                'user_id' => $user->id, // role is User
                'step' => 0, // initial step is 0
                'status' => 'pending' // status is pending
            ]);
        } else {
            return false;
        }
    }

    // Admin requesting Agihan Approval from Boss
    public static function storeByAdmin($mohonDistributionRequestId)
    {

        if ( !self::checkIfExists($mohonDistributionRequestId) ) return false;
  
        $user =  auth('sanctum')->user();
        return MohonDistributionApproval::create([
            'mohon_distribution_request_id' => $mohonDistributionRequestId,
            'user_id' => $user->id, // role is Admin
            'step' => 1, // upgrade from 0 to 1
            'status' => 'pending' // status is pending
        ]);
    }

    // Boss processing Agihan Request from Admin
    public static function storeByBoss($request, $mohonDistributionRequestId)
    {

        if ( !self::checkIfExists($mohonDistributionRequestId) ) return false;
  
        $user =  auth('sanctum')->user();
        return MohonDistributionApproval::create([
            'mohon_distribution_request_id' => $mohonDistributionRequestId,
            'user_id' => $user->id, // role is Boss
            'step' => 2, // upgrade from 1 to 2
            'status' => $request->input('status') // status
        ]);
    }

}