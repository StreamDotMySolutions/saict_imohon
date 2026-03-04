<?php 
namespace App\Services;

use App\Models\Inventory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class InventoryService
{
    public static function index(Request $request)
    {
        $query = Inventory::query()->orderBy('id', 'DESC')->with(['category']);

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('vendor', 'like', "%{$search}%")
                  ->orWhere('contract_name', 'like', "%{$search}%")
                  ->orWhere('contract_number', 'like', "%{$search}%");
            });
        }

        if ($categoryId = $request->input('category_id')) {
            $query->where('category_id', $categoryId);
        }

        return $query->paginate(10)->withQueryString();
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
            'contract_value'  => $request->contract_value,
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
                                'vendor'          => $request->vendor,
                                'model'           => $request->model,
                                'phone'           => $request->phone,
                                'email'           => $request->email,
                                'category_id'     => $request->category_id,
                                'total'           => $request->total,
                                'date_start'      => $request->date_start,
                                'date_end'        => $request->date_end,
                                'received_on'     => $request->received_on,
                                'contract_name'   => $request->contract_name,
                                'contract_number' => $request->contract_number,
                                'contract_owner'  => $request->contract_owner,
                                'contract_pic'    => $request->contract_pic,
                                'contract_value'  => $request->contract_value,
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

    public static function dashboard()
    {
        return Inventory::with('category')
            ->withCount([
                'mohonDistributionItems as dicadangkan_count',
                'mohonDistributionItems as disahkan_count' => function ($q) {
                    $q->whereHas('mohonDistributionRequest', function ($dr) {
                        $dr->whereHas('mohonDistributionApprovals', function ($a) {
                            $a->where('step', 2)->where('status', 'approved');
                        });
                    });
                },
            ])
            ->orderBy('id', 'DESC')
            ->get();
    }

    public static function search(){}

    public static function filter(){}
}