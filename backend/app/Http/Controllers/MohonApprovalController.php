<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\MohonApprovalService;
use App\Http\Requests\MohonApproval\UpdateRequest;
use App\Http\Requests\MohonApproval\StoreRequest;

class MohonApprovalController extends Controller
{
    // User process NohonRequest from step 0 to 1 
    public function byUser(Request $request, $mohonRequestId)
    {

        $mohonApprovalService = MohonApprovalService::storeByUser($request, $mohonRequestId);

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
        $mohonApprovalService = MohonApprovalService::storeByManager($request, $mohonRequestId);

        if($mohonApprovalService)
        {
            return response()->json([
                'message' => 'Permohonan ke Admin berjaya diterima',
            ]);
        } else {
            return response()->json([
                'message' => 'Permohonan ke Admin gagal',
            ],422);
        }
    }

    // Admin process MohonRequest step = 2 to step = 3
    public function byAdmin(UpdateRequest $request, $mohonRequestId)
    {
        //\Log::info($request);
        $mohonApprovalService = MohonApprovalService::storeStep3($request, $mohonRequestId);

        if($mohonApprovalService)
        {
            return response()->json([
                'message' => 'Permohonan ke Boss berjaya diterima',
            ]);
        } else {
            return response()->json([
                'message' => 'Permohonan ke Boss gagal',
            ],422);
        }
    }



    // Boss process MohonRequest step = 3 to step = 4
    public function byBoss(UpdateRequest $request, $mohonRequestId)
    {
        //\Log::info($request);
        $mohonApprovalService = MohonApprovalService::storeStep4($request, $mohonRequestId);

        if($mohonApprovalService)
        {
            return response()->json([
                'message' => 'Permohonan ke Pelulus 3 berjaya diterima',
            ]);
        } else {
            return response()->json([
                'message' => 'Permohonan ke Pelulus 3 gagal',
            ],422);
        }
    }
}
