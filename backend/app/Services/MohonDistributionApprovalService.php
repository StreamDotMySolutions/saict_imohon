<?php
namespace App\Services;

use App\Models\MohonDistributionApproval;
use App\Models\MohonDistributionRequest;
use App\Models\MohonDistributionDelivery;

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
        return MohonDistributionApproval::create([
            'mohon_distribution_request_id' => $mohonDistributionRequestId,
            'user_id' => $user->id, // role is Admin
            'boss_id' => $request->input('boss_id'), // which pelulus 2 ?
            'step' => 1, // upgrade from 0 to 1
            'status' => 'pending', // status is pending
            'message' => $request->input('message') // admin key in justifikasi as message 
        ]);
    }

    // Boss processing Agihan Request from Admin
    public static function storeByBoss($request, $mohonDistributionRequestId)
    {

        if ( !self::checkIfExists($mohonDistributionRequestId) ) return false;
  
        $user =  auth('sanctum')->user();

        // role=boss
        // create new record with step=2
        return MohonDistributionApproval::create([
            'mohon_distribution_request_id' => $mohonDistributionRequestId,
            'user_id' => $user->id, // role is Boss
            'step' => 2, // upgrade from 1 to 2
            'boss_id' =>  $user->id, // role is Boss
            'status' => $request->input('status'), // status
            'message' => $request->input('message') // justifikasi
        ]);
    }

}