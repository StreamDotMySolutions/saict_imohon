<?php

namespace App\Http\Controllers;

use App\Models\Distribution;
use Illuminate\Http\Request;
use App\Services\DistributionApprovalService;
use App\Http\Requests\DistributionApprovalRequest;

class DistributionApprovalController extends Controller
{
    public function index()
    {
        $distributions = DistributionApprovalService::index();
        return response()->json(['distributions' => $distributions]);
    }

    public function show($distribution)
    {
        $distribution = DistributionApprovalService::show($distribution);
        return response()->json(['distribution' => $distribution]);
    }

    public function update(DistributionApprovalRequest $request, $distribution)
    {
        $updated = DistributionApprovalService::update($distribution, $request);
        if($updated){
            return response()->json([ 'message' => 'Agihan telah berjaya dikemaskini']); 
        } else {
            return response()->json([ 'message' => 'Agihan gagal dikemaskini'],422);
        }
    }
}
