<?php
namespace App\Services;

use App\Models\MohonItem;
use Illuminate\Http\Request;

class MohonItemService
{

    public static function index($mohonRequestId)
    {
        $paginate = MohonItem::query();
        $items = $paginate->orderBy('id','DESC')
                                ->with(['category'])
                                ->where('mohon_request_id', $mohonRequestId)
                                ->paginate(10) // 10 items per page
                                ->withQueryString();
    
        return $items;
    }

    public static function store($request, $mohonRequestId)
    {
        //\Log::info($request);
        $user =  auth('sanctum')->user();
        return MohonItem::create([
            'mohon_request_id' => $mohonRequestId,
            'user_id' => $user->id,
            'category_id' => $request->input('category_id'),
            'type' => $request->input('type'),
            'description' => $request->input('description')
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