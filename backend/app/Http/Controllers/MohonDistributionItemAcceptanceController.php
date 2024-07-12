<?php

namespace App\Http\Controllers;
use App\Models\MohonDistributionItemAcceptance;
use App\Http\Requests\MohonDistributionItemAcceptance\StoreRequest;

use Illuminate\Http\Request;

class MohonDistributionItemAcceptanceController extends Controller
{

    public function show($mohonDistributioItemId){
        $data = MohonDistributionItemAcceptance::where('mohon_distribution_item_id', $mohonDistributioItemId)->first();

        return response()->json(['data' => $data]);
    }
    
    public function updateOrCreate(StoreRequest $request, $mohonDistributioItemId)
    {
        //\Log::info($mohonDistributioItemId);
        //\Log::info($request);

        // Define the attributes to search for the record
        $attributes = [
            'mohon_distribution_item_id' => $mohonDistributioItemId,
        ];

        // Define the attributes to update or create
        $values = [
            'user_id' =>  auth('sanctum')->user()->id, // user auth,
            'serial_number' => $request->input('serial_number'),
            'message' => $request->input('message'),
            'description' => 'User accepted the item.',
            'pic_name' => $request->input('pic_name'),
            'pic_phone' => $request->input('pic_phone'),
            'installation_date' => $request->input('installation_date'),
        ];

        // Use updateOrCreate to find and update or create the record
        MohonDistributionItemAcceptance::updateOrCreate($attributes, $values);

        return response()->json(['Item successfully updated']);
    }
}
