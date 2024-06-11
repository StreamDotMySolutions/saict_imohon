<?php

namespace App\Http\Controllers;
use App\Models\MohonDistributionItemDelivery;
use App\Http\Requests\MohonDistributionItemAcceptance\StoreRequest;

use Illuminate\Http\Request;

class MohonDistributionItemAcceptanceController extends Controller
{
    public function updateOrCreate(StoreRequest $request, $mohonDistributioItemId)
    {
        \Log::info($mohonDistributioItemId);
        \Log::info($request);

        // Define the attributes to search for the record
        // $attributes = [
        //     'mohon_distribution_item_id' => $mohonDistributioItemId,
        // ];

        // // Define the attributes to update or create
        // $values = [
        //     'pic_name' => $request->input('pic_name'),
        //     'pic_phone' => $request->input('pic_phone'),
        //     'date_start' => $request->input('date_start'),
        //     'date_end' => $request->input('date_end'),
        // ];

        // // Use updateOrCreate to find and update or create the record
        // MohonDistributionItemDelivery::updateOrCreate($attributes, $values);

        return response()->json(['Item successfully updated']);
    }
}
