<?php 
namespace App\Services;

use App\Models\Inventory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class InventoryService
{
    public static function index()
    {
        $paginate = Inventory::query();
        $inventories = $paginate->orderBy('id','DESC')
                                ->paginate(25)
                                ->withQueryString();
    
        return $inventories;
    }

    public static function store(Request $request)
    {
        //\Log::info($request);
        $user =  auth('sanctum')->user();
        $inventory = Inventory::create([
            'user_id' => $user->id,
            'vendor'  => $request->vendor,
            'item'  => $request->item,
            'total'  => $request->total,
            'date_start'  => $request->date_start,
            'date_end'  => $request->date_end,
            'received_on'  => $request->received_on,
        ]);
        return $inventory;
    }

    public static function show(Inventory $inventory)
    {
        return $inventory;
    }

    public static function update($inventory,$request)
    {
        $user =  auth('sanctum')->user();
        return Inventory::query()
                            ->where('user_id', $user->id)
                            ->where('id',$inventory->id)
                            ->update([
                                'vendor'  => $request->vendor,
                                'item'  => $request->item,
                                'total'  => $request->total,
                                'date_start'  => $request->date_start,
                                'date_end'  => $request->date_end,
                                'received_on'  => $request->received_on,
                                ]);
    }

    public static function delete(){}

    public static function search(){}

    public static function filter(){}
}