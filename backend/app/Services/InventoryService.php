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
                                ->with(['category'])
                                ->paginate(10)
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
            'model'  => $request->model,
            'phone'  => $request->phone,
            'email'  => $request->email,
            //'item'  => $request->item,
            'category_id'  => $request->category_id,
            'total'  => $request->total,
            'date_start'  => $request->date_start,
            'date_end'  => $request->date_end,
            'received_on'  => $request->received_on,
            'contract_name'  => $request->contract_name,
            'contract_number'  => $request->contract_number,
            'contract_owner'  => $request->contract_owner,
            'contract_pic'  => $request->contract_pic,
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
                            //->where('user_id', $user->id)
                            ->where('id',$inventory->id)
                            ->update([
                                'vendor'  => $request->vendor,
                                'item'  => $request->item,
                                'total'  => $request->total,
                                'date_start'  => $request->date_start,
                                'date_end'  => $request->date_end,
                                'received_on'  => $request->received_on,
                                'contract_name'  => $request->contract_name,
                                'contract_number'  => $request->contract_number,
                                'contract_owner'  => $request->contract_owner,
                                'contract_pic'  => $request->contract_pic,
                                ]);
    }

    public static function delete($inventory)
    {
        $user =  auth('sanctum')->user();
        $inventory = Inventory::query()
                            //->where('user_id', $user->id)
                            ->where('id',$inventory->id)
                            ->delete();
        return $inventory;
    }

    public static function search(){}

    public static function filter(){}
}