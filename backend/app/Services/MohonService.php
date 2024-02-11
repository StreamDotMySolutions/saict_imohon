<?php
namespace App\Services;

use App\Models\MohonRequest;
use Illuminate\Http\Request;

class MohonService
{

    public static function index()
    {
        $paginate = MohonRequest::query();
        $requests = $paginate->orderBy('id','DESC')
                                ->paginate(2) // 2 items per page
                                ->withQueryString();
    
        return $requests;
    }

    public static function store($request)
    {
        //\Log::info($request);
        $user =  auth('sanctum')->user();
        return MohonRequest::create([
            'user_id' => $user->id,
            'title' => $request->input('title'),
            'description' => $request->input('description')
        ]);
    }
}