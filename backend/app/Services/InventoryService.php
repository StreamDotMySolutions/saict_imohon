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

    public static function store(){}

    public static function show(){}

    public static function update(){}

    public static function delete(){}

    public static function search(){}

    public static function filter(){}
}