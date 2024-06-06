<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MohonDistributionItem;
use App\Models\Category;
use App\Services\MohonDistributionItemService;
use App\Http\Requests\MohonDistributionItem\StoreRequest;
use App\Http\Requests\MohonDistributionItem\UpdateRequest;
use App\Http\Requests\MohonDistributionItem\ReceivedRequest;
// use App\Http\Requests\DeleteMohonRequest;

class MohonDistributionItemController extends Controller
{

    public function index($mohonRequestId)
    {
        $items = MohonDistributionItemService::index($mohonRequestId);

        return response()->json([
            'items' => $items
        ]);
    }

    public function store(StoreRequest $request, $mohonRequestId)
    {
        $mohonItem = MohonDistributionItemService::store($request, $mohonRequestId);

        return response()->json([
            'message' => 'Item berjaya disimpan',
        ]);
    }

    public function show($id)
    {
        $item = MohonDistributionItemService::show($id);

        return response()->json([
            'item' => $item
        ]);
    }

    public function update(UpdateRequest $request, $id)
    {
        $updated = MohonDistributionItemService::update($request,$id);

        if($updated){
            return response()->json([
                'message' => 'Item berjaya dikemaskini',
            ]);
        } else {
            return response()->json([
                'message' => 'Item gagal dikemaskini',
            ],422);
        }
    }

    public function received(ReceivedRequest $request, $id)
    {
        $updated = MohonDistributionItemService::received($request,$id);

        if($updated){
            return response()->json([
                'message' => 'Item berjaya dikemaskini',
            ]);
        } else {
            return response()->json([
                'message' => 'Item gagal dikemaskini',
            ],422);
        }
    }

    public function delete($id)
    {
        $deleted = MohonDistributionItemService::delete($id);

        if($deleted){
            return response()->json([
                'message' => 'Item berjaya dipadam',
         
            ]);
        } else {
            return response()->json([
                'message' => 'Item gagal dipadam',
            ],422);
        }
    }

    public function categories()
    {
        $node =  Category::where('name','items')->first(); // where name = items
        $categories = Category::whereDescendantOf($node)->get();
        
        if($categories->isNotEmpty()){
            return response()->json(['categories' => $categories]);
        }else{
            return response()->json(['message' => 'Please insert item in Category Model'],422);
        }
    }

    public function create(Request $request, $mohonDistributionRequestId)
    {
        $user =  auth('sanctum')->user();
        MohonDistributionItem::create([
            'mohon_distribution_request_id' => $mohonDistributionRequestId,
            'user_id' => $user->id,
            'category_id' => $request->input('category_id') ?? null,
            'mohon_item_id' => $request->input('mohon_item_id') ?? null,
            'type' => $request->input('type') ?? null,
            'vendor_name' => $request->input('vendor') ?? null,
            'description' => $request->input('selectedItems.0.category_name') ?? null
        ]);
        \Log::info($request);
   
    }

    public function sync(Request $request,$mohonDistributionItemId)
    {
        /*
        * admin choose type [ new,selection]
        * admin choose vendor [vendor name]
        * update based on id
        */
        $mohonDistributionItemId = $request->input('mohon_distribution_item_id');
        $updateData = [];
        
        if ($request->has('type')) {
            $updateData['type'] = $request->input('type');
        }
        
        if ($request->has('vendor')) {
            $updateData['vendor_name'] = $request->input('vendor');
        }
        
        if (!empty($updateData)) {
            MohonDistributionItem::where('id', $mohonDistributionItemId)->update($updateData);
        }
    
        \Log::info('api sync data. ' );
        \Log::info($request);
    }

    public function remove(Request $request)
    {
        MohonDistributionItem::where('mohon_item_id', $request->input('itemId'))->delete();
        \Log::info($request);
    }

    public function items($mohonDistributionRequestId)
    {
        /*
        * To list assigned items to $mohonDistributionId
        */
        $items = MohonDistributionItem::where('mohon_distribution_request_id', $mohonDistributionRequestId)->get();
        
        if($items->isNotEmpty()){
            return response()->json(['items' => $items]);
        }else{
            return response()->json(['message' => 'No assigned items'],404);
        }

    }

}
