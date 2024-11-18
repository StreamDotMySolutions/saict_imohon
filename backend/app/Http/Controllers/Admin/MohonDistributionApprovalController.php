<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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
    public function store(StoreRequest $request, $mohonDistributionRequestId)
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


}
