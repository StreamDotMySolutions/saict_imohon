<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MohonItem;
use App\Services\MohonItemService;
use App\Http\Requests\MohonItem\StoreMohonRequest;
use App\Http\Requests\MohonItem\UpdateMohonRequest;
// use App\Http\Requests\DeleteMohonRequest;

class MohonController extends Controller
{

    public function index()
    {
        $items = MohonItemService::index();

        return response()->json([
            'items' => $items
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

    public function update(UpdateMohonRequest $request, $id)
    {
        // \Log::info($id);
        // \Log::info($request);

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

    public function delete($id)
    {
        $deleted = MohonService::delete($id);

        if($deleted){
            return response()->json([
                'message' => 'Permohonan berjaya dipadam',
                'id' => $id
            ]);
        } else {
            return response()->json([
                'message' => 'Permohonan gagal dipadam',
            ],422);
        }
    }

}
