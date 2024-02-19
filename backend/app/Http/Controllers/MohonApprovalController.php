<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\MohonApprovalService;
use App\Http\Requests\MohonApproval\UpdateRequest;

class MohonApprovalController extends Controller
{
    // User process NohonRequest from step 0 to 1 
    public function store(Request $request, $mohonRequestId){

        $mohonApprovalService = MohonApprovalService::storeStep1($request, $mohonRequestId);

        if($mohonApprovalService)
        {
            return response()->json([
                'message' => 'Permohonan ke Pelulus 1 berjaya diterima',
            ]);
        } else {
            return response()->json([
                'message' => 'Permohonan ke Pelulus 1 gagal',
            ],422);
        }
    }

    // Manager process MohonRequest step = 1 to step = 2
    public function byManager(UpdateRequest $request, $mohonRequestId)
    {
        //\Log::info($request);
        $mohonApprovalService = MohonApprovalService::storeStep2($request, $mohonRequestId);

        if($mohonApprovalService)
        {
            return response()->json([
                'message' => 'Permohonan ke Pelulus 1 berjaya diterima',
            ]);
        } else {
            return response()->json([
                'message' => 'Permohonan ke Pelulus 1 gagal',
            ],422);
        }
    }
}
