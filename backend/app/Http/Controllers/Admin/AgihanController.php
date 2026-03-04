<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MohonRequest;
use App\Models\Inventory;

class AgihanController extends Controller
{
    public function vendors($categoryId)
    {
        $vendors = Inventory::where('category_id', $categoryId)->get();
        return response()->json(['vendors' => $vendors]);
    }

    public function show($mohonId)
    {
        $mohon = MohonRequest::with([
            'user.userProfile.userDepartment',
            'mohonItems.category',
            'mohonDistributionRequests.mohonDistributionItems.mohonItem',
            'mohonDistributionRequests.mohonDistributionItems.category',
            'mohonDistributionRequests.mohonDistributionItems.inventory',
            'mohonDistributionRequests.mohonDistributionItems.mohonDistributionItemDelivery',
            'mohonDistributionRequests.mohonDistributionApprovals.boss',
        ])->findOrFail($mohonId);

        return response()->json(['mohon' => $mohon]);
    }

    public function mohon(Request $request)
    {
        $tab = $request->input('tab', 'baharu');

        // Base: only mohon requests fully approved by admin (step=4, approved)
        $query = MohonRequest::query()
            ->with(['user.userProfile.userDepartment', 'mohonApproval'])
            ->where('step', 4)
            ->where('status', 'approved')
            ->withCount([
                'mohonItems',
                'mohonDistributionItems',
                'mohonDistributionItems as mohon_distribution_items_with_delivery_count' => function ($q) {
                    $q->whereHas('mohonDistributionItemDelivery');
                },
                'mohonDistributionItems as mohon_distribution_items_with_acceptance_count' => function ($q) {
                    $q->whereHas('mohonDistributionItemAcceptance');
                },
            ]);

        if ($tab === 'menunggu') {
            // Submitted to boss (step=1 pending), no boss decision yet
            $query->whereHas('mohonDistributionRequests.mohonDistributionApprovals', function ($q) {
                $q->where('step', 1)->where('status', 'pending');
            })->whereDoesntHave('mohonDistributionRequests.mohonDistributionApprovals', function ($q) {
                $q->where('step', 2);
            });
        } elseif ($tab === 'lulus') {
            // Boss approved (step=2 approved)
            $query->whereHas('mohonDistributionRequests.mohonDistributionApprovals', function ($q) {
                $q->where('step', 2)->where('status', 'approved');
            });
        } elseif ($tab === 'gagal') {
            // Boss rejected (step=2 rejected)
            $query->whereHas('mohonDistributionRequests.mohonDistributionApprovals', function ($q) {
                $q->where('step', 2)->where('status', 'rejected');
            });
        } else {
            // Baharu: admin approved but no distribution submitted to boss yet
            $query->whereDoesntHave('mohonDistributionRequests', function ($q) {
                $q->whereHas('mohonDistributionApprovals', function ($q2) {
                    $q2->where('step', '>=', 1);
                });
            });
        }

        $items = $query->orderBy('id', 'DESC')
            ->paginate(10)
            ->withQueryString();

        return response()->json(['items' => $items]);
    }


}
