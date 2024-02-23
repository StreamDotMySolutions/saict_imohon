<?php
namespace App\Services;

use App\Models\MohonDistributionRequest;

class MohonDistributionRequestService
{

    /*
    * To show MohonDistribution Request
    * by MohonRequestId
    * MohonRequest hasMany MohonDistributionRequest
    */
    public static function index($mohonRequestId)
    {
        $paginate = MohonDistributionRequest::query();
        $items = $paginate->orderBy('id','DESC')
                            ->where('mohon_request_id', $mohonRequestId)
                            ->paginate(10) // 10 items per page
                            ->withQueryString(); // additional GET requests
        return $items;
    }


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
            'title' => $request->input('title')
            'description' => $request->input('description')
        ]);
    }
}