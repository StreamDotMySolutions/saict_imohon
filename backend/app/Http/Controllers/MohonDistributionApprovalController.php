<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\MohonDistributionApprovalService;

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
}
