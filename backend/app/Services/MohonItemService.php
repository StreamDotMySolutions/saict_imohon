<?php
namespace App\Services;

use App\Models\MohonItem;
use Illuminate\Http\Request;

class MohonItemService
{

    public static function index()
    {
        $paginate = MohonItem::query();
        $items = $paginate->orderBy('id','DESC')
                                ->paginate(10) // 10 items per page
                                ->withQueryString();
    
        return $items;
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