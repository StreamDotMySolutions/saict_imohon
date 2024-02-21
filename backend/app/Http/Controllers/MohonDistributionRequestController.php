<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\MohonDistributionRequestService;
use App\Http\Requests\MohonDistributionRequest\StoreRequest;

class MohonDistributionRequestController extends Controller
{
    public function store(Request $request)
    {

        $request = MohonDistributionRequestService::store($request);

        if($request){
            return response()->json([
                'message' => 'Permohonan disimpan',
            ]);
        } else {
            return response()->json([
                'message' => 'Permohonan gagaldisimpan',
            ],422);
        }

    }
}
