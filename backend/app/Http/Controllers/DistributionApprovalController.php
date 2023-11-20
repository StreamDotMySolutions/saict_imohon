<?php

namespace App\Http\Controllers;

use App\Models\Distribution;
use Illuminate\Http\Request;
use App\Services\DistributionApprovalService;

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
}
