<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MohonDistributionRequest;
use App\Services\MohonDistributionRequestService;
use App\Http\Requests\MohonDistributionRequest\StoreRequest;
use App\Http\Requests\MohonDistributionRequest\UpdateRequest;
// use App\Http\Requests\DeleteMohonRequest;

class MohonDistributionRequestController extends Controller
{

    public function index($mohonRequestId)
    {
        $mohons = MohonDistributionRequestService::index($mohonRequestId);

        return response()->json([
            'mohons' => $mohons
        ]);
    }

    public function store(StoreRequest $request, $mohonRequestId)
    {

        $mohonDistributionRequest = MohonDistributionRequestService::store($request, $mohonRequestId);

        return response()->json([
            'message' => 'Permohonan agihan berjaya disimpan',
            'id' => $mohonDistributionRequest->id
        ]);
    }


    /*
    * To list all requests for role = boss
    * step = 1
    * status = pending
    */
    public function byBoss($status = 'pending')
    {

        //\Log::info($status);
    }

    public function show($id)
    {
        $mohon = MohonDistributionRequestService::show($id);
        return response()->json([
            'mohon' => $mohon
        ]);
    }

    public function update(UpdateRequest $request, $id)
    {
        // \Log::info($id);
        // \Log::info($request);

        $updated = MohonDistributionRequestService::update($request,$id);

        if($updated){
            return response()->json([
                'message' => 'Permohonan agihan berjaya dikemaskini',
                'id' => $id
            ]);
        } else {
            return response()->json([
                'message' => 'Permohonan agihan gagal dikemaskini',
            ],422);
        }
    }

    public function delete($id)
    {
        $deleted = MohonDistributionRequestService::delete($id);

        if($deleted){
            return response()->json([
                'message' => 'Permohonan agihan berjaya dipadam',
                'id' => $id
            ]);
        } else {
            return response()->json([
                'message' => 'Permohonan agihan gagal dipadam',
            ],422);
        }
    }

}