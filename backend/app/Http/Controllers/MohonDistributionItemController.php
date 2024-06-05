<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
//use App\Models\MohonDistributionItem;
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

    public function sync(Request $request)
    {
        \Log::info($request);
    }

}
