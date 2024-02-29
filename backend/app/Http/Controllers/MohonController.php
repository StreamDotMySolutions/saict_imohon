<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MohonRequest;
use App\Services\MohonService;
use App\Http\Requests\Mohon\StoreMohonRequest;
use App\Http\Requests\Mohon\UpdateMohonRequest;
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

        $mohon = MohonService::store($request);

        return response()->json([
            'message' => 'Permohonan disimpan',
            'id' => $mohon->id
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
