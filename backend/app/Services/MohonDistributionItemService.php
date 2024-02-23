<?php
namespace App\Services;

use App\Models\MohonDistributionItem;
use Illuminate\Http\Request;

class MohonDistributionItemService
{

    public static function index($mohonDistributionRequestId)
    {
        $paginate = MohonDistributionItem::query();
        $items = $paginate->orderBy('id','DESC')
                                ->with(['category'])
                                ->where('mohon_distribution_request_id', $mohonDistributionRequestId)
                                ->paginate(10) // 10 items per page
                                ->withQueryString();
    
        return $items;
    }

    public static function store($request, $mohonDistributionRequestId)
    {
        //\Log::info($request);
        $user =  auth('sanctum')->user();
        return MohonDistributionItem::create([
            'mohon_distribution_request_id' => $mohonDistributionRequestId,
            'user_id' => $user->id,
            'category_id' => $request->input('category_id'),
            'type' => $request->input('type'),
            'description' => $request->input('description')
        ]);

        // create MohonApproval
        
    }

    public static function show($id)
    {
        $item = MohonDistributionItem::query()
                    ->where('id', $id)
                    //->with(['application.user.userProfile.userDepartment'])
                    ->first();
        return $item;
    }

    public static function update($request, $id)
    {
        return MohonDistributionItem::query()
                        ->where('id',$id)
                        ->update([
                            'category_id' => $request->input('category_id'),
                            'type' => $request->input('type'),
                            'description' => $request->input('description')
                            ]);
    }

    public static function delete($id)
    {
 
        return MohonDistributionItem::query()
                            ->where('id',$id)
                            ->delete();
    }
}