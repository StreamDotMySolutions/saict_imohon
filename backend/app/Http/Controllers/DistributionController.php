<?php

namespace App\Http\Controllers;

use App\Models\Distribution;
use Illuminate\Http\Request;
use App\Services\DistributionService;
use App\Http\Requests\StoreDistributionRequest;

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
        \Log::info($request);
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Distribution $distribution)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Distribution $distribution)
    {
        //
    }
}
