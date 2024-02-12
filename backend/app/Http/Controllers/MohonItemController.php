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
        $mohon = MohonService::show($id);

        return response()->json([
            'mohon' => $mohon
        ]);
    }

    public function update(UpdateMohonRequest $request, $id)
    {
        // \Log::info($id);
        // \Log::info($request);

        $updated = MohonService::update($request,$id);

        if($updated){
            return response()->json([
                'message' => 'Permohonan berjaya dikemaskini',
                'id' => $id
            ]);
        } else {
            return response()->json([
                'message' => 'Permohonan gagal dikemaskini',
            ],422);
        }
    }

    public function delete($id)
    {
        $deleted = MohonService::delete($id);

        if($deleted){
            return response()->json([
                'message' => 'Permohonan berjaya dipadam',
                'id' => $id
            ]);
        } else {
            return response()->json([
                'message' => 'Permohonan gagal dipadam',
            ],422);
        }
    }

    public function categories()
    {

        $node =  Category::where('name','items')->first(); // where name = items
        $categories = Category::whereDescendantOf($node)->get();
        return response()->json(['categories' => $categories]);
        
    }

}
