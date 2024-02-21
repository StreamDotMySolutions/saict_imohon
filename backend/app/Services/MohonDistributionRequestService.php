<?php
namespace App\Services;

use App\Models\MohonDistributionRequest;

class MohonDistributionRequestService
{
    /*
    * Admin requesting approval from Boss
    * on allocated Item based on Permohonan
    */

    public static function store($request, $mohonRequestId)
    {
        //\Log::info($request);
        $user =  auth('sanctum')->user();
        return MohonDistributionRequest::create([
            'mohon_request_id' => $mohonRequestId,
            'user_id' => $user->id, // Admin
            'step' => 1,
            'status' => 'pending',
            'message' => $request->input('message')
        ]);
    }
}