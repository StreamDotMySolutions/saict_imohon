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

    public function index()
    {
        $mohons = MohonService::index();

        return response()->json([
            'mohons' => $mohons
        ]);
    }

    public function store(StoreMohonRequest $request)
    {
        //\Log::info($request);
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

    public function show($id)
    {
        $mohon = MohonService::show($id);

        return response()->json([
            'mohon' => $mohon
        ]);
    }

    public function update(Request $request, $id)
    {
        \Log::info($id);
        \Log::info($request);

        // check ownership before update
        $updated = MohonService::update($request,$id);

        if($updated){
            return response()->json([
                'message' => 'Permohonan berjaya dikemaskini',
                'id' => $id
            ]);
        } else {
            return response()->json([
                'message' => 'Permohonan gagal dikemaskini',
            ],422);
        }
 
    }

}
