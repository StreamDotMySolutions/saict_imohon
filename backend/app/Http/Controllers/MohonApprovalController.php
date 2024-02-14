<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\MohonApprovalService;

class MohonApprovalController extends Controller
{
    //
    public function store(Request $request, $mohonRequestId){

        $mohonApprovalService = MohonApprovalService::store($request, $mohonRequestId);

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