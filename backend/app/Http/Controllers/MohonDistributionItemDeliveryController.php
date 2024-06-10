<?php

namespace App\Http\Controllers;
use App\Models\MohonDistributionItemDelivery;

use Illuminate\Http\Request;

class MohonDistributionItemDeliveryController extends Controller
{
    public function updateOrCreate(Request $request, $mohonDistributioItemId)
    {
        \Log::info($mohonDistributioItemId);
        return response()->json(['Item successfully updated']);
    }
}
