<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MohonItem;
use Illuminate\Http\Request;

class RequestedItemController extends Controller
{
    public function index(Request $request)
    {
        $items = MohonItem::query()
            ->orderBy('id', 'DESC')
            ->with([
                'category',
                'mohonRequest.user.userProfile.userDepartment',
                'mohonRequest.mohonApproval',
                'mohonDistributionItem.mohonDistributionItemDelivery',
                'mohonDistributionItem.mohonDistributionItemAcceptance',
            ])
            ->when($request->input('category_id'), fn($q, $v) => $q->where('category_id', $v))
            ->when($request->input('type'), fn($q, $v) => $q->where('type', $v))
            ->when($request->input('search'), function ($q, $search) {
                $q->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhereHas('category', fn($q) => $q->where('name', 'like', "%{$search}%"))
                      ->orWhereHas('mohonRequest.user', fn($q) => $q->where('name', 'like', "%{$search}%"));
                });
            })
            ->paginate(15)
            ->withQueryString();

        return response()->json(['items' => $items]);
    }

    public function stats()
    {
        $total = MohonItem::count();

        $agihan = MohonItem::whereHas('mohonDistributionItem')->count();

        $diterima = MohonItem::whereHas('mohonDistributionItem', function ($q) {
            $q->whereHas('mohonDistributionItemAcceptance');
        })->count();

        $ditolak = MohonItem::whereHas('mohonRequest', function ($q) {
            $q->whereHas('mohonApproval', fn($a) => $a->where('status', 'rejected'));
        })->count();

        return response()->json([
            'total' => $total,
            'agihan' => $agihan,
            'diterima' => $diterima,
            'ditolak' => $ditolak,
        ]);
    }
}
