<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ApplicationService;

class InventoryController extends Controller
{
    public function index()
    {
        $inventories = InventoryService::index();
        return response()->json(['inventories', $inventories]);
    }

    public function store(StoreInventoryRequest $request)
    {
        InventoryService::store();
        return response()->json([]);
    }
    public function show(Inventory $inventory)
    {
        $inventory = InventoryService::show($inventory);
        return response()->json(['inventory', $inventory]);
    }

    public function update(Inventory $inventory, UpdateInventoryRequest $request)
    {
        InventoryService::update($inventory, $request);
        return response()->json([]);
    }

    public function delete(Inventory $inventory)
    {
        InventoryService::delete($inventory);
        return response()->json([]);
    }

}
