<?php
namespace App\Services;

use App\Models\MohonRequest;
use App\Models\MohonApproval;
use Illuminate\Http\Request;

class MohonService
{

    public static function index()
    {
        $paginate = MohonRequest::query();
        $requests = $paginate->orderBy('id','DESC')
                                ->paginate(10) // 10 items per page
                                ->withQueryString();
    
        return $requests;
    }

    public static function store($request)
    {
        //\Log::info($request);
        $user =  auth('sanctum')->user();
        $mohonRequest = MohonRequest::create([
            'user_id' => $user->id,
            'title' => $request->input('title'),
            'description' => $request->input('description')
        ]);

        // create MohonApproval
        $mohonApproval = MohonApproval::create([
            'mohon_request_id' => $mohonRequest->id,
            'user_id' => $user->id,
            'step' => 0,
            'status' => 'pending',
        ]);

    
        
    }

    public static function show($id)
    {
        $request = MohonRequest::query()
                    ->where('id', $id)
                    //->with(['application.user.userProfile.userDepartment'])
                    ->first();
        return $request;
    }

    public static function update($request, $id)
    {
        $user =  auth('sanctum')->user();
        return MohonRequest::query()
                            ->where('user_id', $user->id)
                            ->where('id',$id)
                            ->update([
                                'title'  => $request->input('title'),
                                'description'  => $request->input('description'),
                                ]);
    }

    public static function delete($id)
    {
        $user =  auth('sanctum')->user();
        return MohonRequest::query()
                            ->where('user_id', $user->id)
                            ->where('id',$id)
                            ->delete();
    }
}