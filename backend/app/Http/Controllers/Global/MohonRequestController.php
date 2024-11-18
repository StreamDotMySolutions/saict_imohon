<?php

namespace App\Http\Controllers\Global;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\MohonService;


class MohonRequestController extends Controller
{

    public function index(Request $request)
    {
        $mohons = MohonService::index($request->input('status'));
        return response()->json([
            'mohons' => $mohons
        ]);
    }

    public function show($mohonRequestid)
    {
        $mohon = MohonService::show($mohonRequestid);
        return response()->json([
            'mohon' => $mohon
        ]);
    }



}
