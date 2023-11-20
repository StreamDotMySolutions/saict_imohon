<?php

namespace App\Http\Controllers;

use App\Models\Distribution;
use Illuminate\Http\Request;
use App\Services\DistributionAcceptanceService;
use App\Http\Requests\DistributionAcceptanceRequest;

class DistributionAcceptanceController extends Controller
{
    public function index()
    {
        $distributions = DistributionAcceptanceService::index();
        return response()->json(['distributions' => $distributions]);
    }

    public function show($distribution)
    {
        $distribution = DistributionAcceptanceService::show($distribution);
        return response()->json(['distribution' => $distribution]);
    }

    public function update(DistributionAcceptanceRequest $request, $distribution)
    {
        $updated = DistributionAcceptanceService::update($distribution, $request);
        if($updated){
            return response()->json([ 'message' => 'Agihan telah berjaya dikemaskini']); 
        } else {
            return response()->json([ 'message' => 'Agihan gagal dikemaskini'],422);
        }
    }
}
