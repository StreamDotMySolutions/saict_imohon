<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MohonItem;
use App\Models\Category;
use App\Services\MohonItemService;
use App\Http\Requests\MohonItem\StoreRequest;
use App\Http\Requests\MohonItem\UpdateRequest;
// use App\Http\Requests\DeleteMohonRequest;

class MohonItemController extends Controller
{

    public function index($mohonRequestId)
    {
        $items = MohonItemService::index($mohonRequestId);

        return response()->json([
            'items' => $items
        ]);
    }

    public function store(StoreRequest $request, $mohonRequestId)
    {
        $mohonItem = MohonItemService::store($request, $mohonRequestId);

        return response()->json([
            'message' => 'Item berjaya disimpan',
        ]);
    }

    public function show($id)
    {
        $item = MohonItemService::show($id);

        return response()->json([
            'item' => $item
        ]);
    }

    public function update(UpdateRequest $request, $id)
    {
        $updated = MohonItemService::update($request,$id);

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
        $deleted = MohonItemService::delete($id);

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
        
        if($categories){
            return response()->json(['categories' => $categories]);
        }else{
            return response()->json(['message' => 'Please insert items category'],422);
        }
    }

}
