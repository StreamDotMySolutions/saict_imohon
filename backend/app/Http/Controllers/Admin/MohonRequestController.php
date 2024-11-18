<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\MohonRequest;
use App\Services\Administrations\MohonService;
use App\Http\Requests\Mohon\StoreMohonRequest;
use App\Http\Requests\Mohon\UpdateMohonRequest;
// use App\Http\Requests\DeleteMohonRequest;

class MohonRequestController extends Controller
{

    public function index()
    {
        $mohons = MohonService::index();

        return response()->json([
            'mohons' => $mohons
        ]);
    }


    public function delete($mohonRequestId)
    {
        $deleted = MohonService::delete($mohonRequestId);

        if($deleted){
            return response()->json([
                'message' => 'Permohonan berjaya dipadam',
                'mohonRequestId' => $mohonRequestId
            ]);
        } else {
            return response()->json([
                'message' => 'Permohonan gagal dipadam',
            ],422);
        }
    }

}
