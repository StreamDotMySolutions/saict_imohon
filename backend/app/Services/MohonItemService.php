<?php
namespace App\Services;

use App\Models\MohonItem;
use App\Models\MohonApproval;
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
            'description' => $request->input('description'),
            'name' => $request->input('name'),
            'occupation' => $request->input('occupation'),
            'department_id' => $request->input('department_id'),
            'building_name' => $request->input('building_name'),
            'building_level' => $request->input('building_level'),

            //'department' => $request->input('department'),
            //'section' => $request->input('section'),
            //'unit' => $request->input('unit'),
            'mobile' => $request->input('mobile'),
            'location' => $request->input('location'),
        ]);

        // create MohonApproval
        
    }

    public static function show($id)
    {
        $item = MohonItem::query()
                    ->where('id', $id)
                    //->with(['application.user.userProfile.userDepartment'])
                    ->first();
        return $item;
    }

    public static function update($request, $id)
    {
        return MohonItem::query()
                        ->where('id',$id)
                        ->update([
                            'category_id' => $request->input('category_id'),
                            'type' => $request->input('type'),
                            'description' => $request->input('description'),
                            'name' => $request->input('name'),
                            'occupation' => $request->input('occupation'),

                            'department_id' => $request->input('department_id'),
                            'building_name' => $request->input('building_name'),
                            'building_level' => $request->input('building_level'),
                            
                            // 'department' => $request->input('department'),
                            // 'section' => $request->input('section'),
                            // 'unit' => $request->input('unit'),
                            'mobile' => $request->input('mobile'),
                            'location' => $request->input('location'),
                            ]);
    }

    public static function delete($id)
    {
 
        return MohonItem::query()
                            ->where('id',$id)
                            ->delete();
    }
}