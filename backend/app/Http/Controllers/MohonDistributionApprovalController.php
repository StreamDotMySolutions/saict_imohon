<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\MohonDistributionApprovalService;
use App\Models\MohonDistributionRequest;
use App\Http\Requests\MohonDistributionApproval\UpdateRequest;

class MohonDistributionApprovalController extends Controller
{
    /*
    * Admin requesting Agihan Approval from Boss
    */
    public function byAdmin($mohonDistributionRequestId)
    {
        // \Log::info($mohonDistributionRequestId);
       
        // create new data in MohonDistributionApproval
        // step = 1 ( for Boss to view )
        // status = pending
        $request = MohonDistributionApprovalService::storeStep1($mohonDistributionRequestId);

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
    */
    public function byBoss(UpdateRequest $request,$mohonDistributionRequestId)
    {
        // Role boss to approve or reject
        // Step upgraded from 1 into 2
        $request = MohonDistributionApprovalService::storeStep2($request,$mohonDistributionRequestId);

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
