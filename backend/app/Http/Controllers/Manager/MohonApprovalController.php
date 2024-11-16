<?php
namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\MohonApprovalService;
use App\Http\Requests\MohonApproval\UpdateRequest;
use App\Http\Requests\MohonApproval\StoreRequest;

class MohonApprovalController extends Controller
{

    // Manager process MohonRequest step = 2 to step = 3
    public function update(UpdateRequest $request, $mohonRequestId)
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

    
}
