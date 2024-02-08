<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MohonRequest;
use App\Services\MohonService;

class MohonController extends Controller
{
    public function store(Request $request)
    {
        \Log::info($request);
        /**
         * To store request from Mohon
         * title ~ varchar
         * description ~ text
         */
        $mohonRequest = MohonService::store($request);

        return response()->json([
            'message' => 'Permohonan disimpan',
            'id' => $mohonRequest->id
        ]);
    }
}
