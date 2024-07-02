<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\MohonDistributionApprovalService;
use App\Models\MohonDistributionRequest;
use App\Http\Requests\MohonDistributionApproval\UpdateRequest;
use App\Http\Requests\MohonDistributionApproval\StoreRequest;

class MohonDistributionApprovalController extends Controller
{
    /*
    * Admin requesting Agihan Approval from Boss
    */
    public function byAdmin(StoreRequest $request, $mohonDistributionRequestId)
    {
        //\Log::info($request);
       
        // create new data in MohonDistributionApproval
        // step = 1 ( for Boss to view )
        // status = pending
        $request = MohonDistributionApprovalService::storeByAdmin($request,$mohonDistributionRequestId);

        // response in JSON ( 200 is success and 422 when failed )
        if($request){
            return response()->json([
                'message' => 'Permohonan agihan berjaya disimpan',
            ]);
        } else {
            return response()->json([
                'message' => 'Permohonan agihan gagal disimpan',
            ],422);   
        }
    }


    /*
    * Boss processing Request For Approval from Admin
    * If Approved, will create new relationship with MohonDistributionRequest, MohonDistributionDelivery
    */
    public function byBoss(UpdateRequest $request,$mohonDistributionRequestId)
    {
        // Role boss to approve or reject
        // Step upgraded from 1 into 2
        $request = MohonDistributionApprovalService::storeByBoss($request,$mohonDistributionRequestId);

        // response in JSON ( 200 is success and 422 when failed )
        if($request){
            return response()->json([
                'message' => 'Permohonan agihan berjaya disimpan',
            ]);
        } else {
            return response()->json([
                'message' => 'Permohonan agihan gagal disimpan',
            ],422);   
        }
    }
}
