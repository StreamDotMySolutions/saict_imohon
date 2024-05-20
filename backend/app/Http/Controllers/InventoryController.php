<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\InventoryService;
use App\Models\Inventory;
use App\Http\Requests\Inventory\StoreRequest;
use App\Http\Requests\Inventory\UpdateRequest;
use App\Http\Requests\Inventory\DeleteRequest;

class InventoryController extends Controller
{
    public function index()
    {
        $inventories = InventoryService::index();

        return response()->json([
            'inventories' => $inventories
        ]);
    }

    public function store(StoreRequest $request)
    {
        $inventory = InventoryService::store($request);
        return response()->json([
            'message' => 'Peralatan telah ditambah',
            'id' => $inventory->id
        ]);
    }


    public function show(Inventory $inventory)
    {
        $inventory = InventoryService::show($inventory);
        return response()->json(['inventory' => $inventory]);
    }

    public function update(Inventory $inventory, UpdateRequest $request)
    {
        $updated = InventoryService::update($inventory, $request);
        if($updated){
            return response()->json([ 'message' => 'Peralatan telah berjaya dikemaskini']); 
        } else {
            return response()->json([ 'message' => 'Peralatan gagal dikemaskini'],422);
        }
    }

    public function delete(DeleteRequest $request,Inventory $inventory)
    {
        $deleted = InventoryService::delete($inventory);
        if($deleted){
            return response()->json([ 'message' => 'Peralatan telah berjaya dipadam dari rekod']); 
        } else {
            return response()->json([ 'message' => 'Peralatan gagal dipadam dari rekod'],422);
        }
        
    }

}
