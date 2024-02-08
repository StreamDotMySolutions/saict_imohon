<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MohonRequest;
use App\Services\MohonService;
use App\Http\Requests\StoreMohonRequest;
// use App\Http\Requests\UpdateMohonRequest;
// use App\Http\Requests\DeleteMohonRequest;

class MohonController extends Controller
{
    public function store(StoreMohonRequest $request)
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