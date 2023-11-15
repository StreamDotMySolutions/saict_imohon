<?php

namespace App\Http\Controllers;

use App\Models\Distribution;
use Illuminate\Http\Request;
use App\Services\DistributionService;
use App\Http\Requests\StoreDistributionRequest;
use App\Http\Requests\UpdateDistributionRequest;
use App\Http\Requests\DeleteDistributionRequest;

class DistributionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $distributions = DistributionService::index();
        return response()->json(['distributions' => $distributions]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDistributionRequest $request)
    {
        //\Log::info($request);
        $created = DistributionService::store($request);


        if($created){
            return response()->json(['message' => 'Agihan berjaya dilakukan']);
        } else {
            return response()->json(['message' => 'Agihan gagal dilaksanakan'],422);
        }
       
    }

    /**
     * Display the specified resource.
     */
    public function show(Distribution $distribution)
    {
        $distribution = DistributionService::show($distribution);
        return response()->json(['distribution' => $distribution]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDistributionRequest $request, Distribution $distribution)
    {
        $updated = DistributionService::update($distribution, $request);
        if($updated){
            return response()->json([ 'message' => 'Agihan telah berjaya dikemaskini']); 
        } else {
            return response()->json([ 'message' => 'Agihan gagal dikemaskini'],422);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteDistributionRequest $request, Distribution $distribution)
    {
        $destroyed = DistributionService::destroy($distribution);
        if($destroyed){
            return response()->json([ 'message' => 'Agihan telah berjaya dipadam dari rekod']); 
        } else {
            return response()->json([ 'message' => 'Agihan gagal dipadam dari rekod'],422);
        }
    }
}
