<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\MohonItem;
use Illuminate\Http\Request;

class RequestedItemController extends Controller
{
    public function index(Request $request)
    {
        $user = auth('sanctum')->user();

        $items = MohonItem::query()
            ->orderBy('id', 'DESC')
            ->with([
                'category',
                'mohonRequest.mohonApproval',
                'mohonDistributionItem.mohonDistributionItemDelivery',
                'mohonDistributionItem.mohonDistributionItemAcceptance',
            ])
            ->whereHas('mohonRequest', fn($q) => $q->where('user_id', $user->id))
            ->when($request->input('category_id'), fn($q, $v) => $q->where('category_id', $v))
            ->when($request->input('type'), fn($q, $v) => $q->where('type', $v))
            ->when($request->input('search'), function ($q, $search) {
                $q->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhereHas('category', fn($q) => $q->where('name', 'like', "%{$search}%"));
                });
            })
            ->paginate(15)
            ->withQueryString();

        return response()->json(['items' => $items]);
    }

    public function stats()
    {
        $user = auth('sanctum')->user();

        $base = MohonItem::whereHas('mohonRequest', fn($q) => $q->where('user_id', $user->id));

        $total = (clone $base)->count();

        $agihan = (clone $base)->whereHas('mohonDistributionItem')->count();

        $diterima = (clone $base)->whereHas('mohonDistributionItem', function ($q) {
            $q->whereHas('mohonDistributionItemAcceptance');
        })->count();

        $ditolak = (clone $base)->whereHas('mohonRequest', function ($q) use ($user) {
            $q->where('user_id', $user->id)
              ->whereHas('mohonApproval', fn($a) => $a->where('status', 'rejected'));
        })->count();

        return response()->json([
            'total' => $total,
            'agihan' => $agihan,
            'diterima' => $diterima,
            'ditolak' => $ditolak,
        ]);
    }
}
