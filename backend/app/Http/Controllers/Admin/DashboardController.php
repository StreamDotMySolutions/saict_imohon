<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Inventory;
use App\Models\MohonDistributionItem;
use App\Models\MohonDistributionItemDelivery;
use App\Models\MohonDistributionRequest;
use App\Models\MohonRequest;
use App\Models\User;
use App\Models\UserDepartment;

class DashboardController extends Controller
{
    public function index()
    {
        // --- Users ---
        $userCounts = [
            'user'    => User::role('user')->where('is_approved', true)->count(),
            'admin'   => User::role('admin')->where('is_approved', true)->count(),
            'manager' => User::role('manager')->where('is_approved', true)->count(),
            'boss'    => User::role('boss')->where('is_approved', true)->count(),
            'pending' => User::where('is_approved', false)->count(),
        ];
        $departmentCount = UserDepartment::count();

        // --- Inventory ---
        $byCategory = Inventory::with('category')
            ->get()
            ->groupBy('category_id')
            ->map(fn($items) => [
                'category' => $items->first()->category?->name ?? 'Tiada Kategori',
                'total'    => $items->sum('total'),
            ])
            ->values();

        $dicadangkan = MohonDistributionItem::whereNotNull('inventory_id')->count();

        $disahkan = MohonDistributionItem::whereNotNull('inventory_id')
            ->whereHas('mohonDistributionRequest', fn($dr) =>
                $dr->whereHas('mohonDistributionApprovals', fn($a) =>
                    $a->where('step', 2)->where('status', 'approved')
                )
            )->count();

        // --- Workflow ---
        $workflow = [
            'permohonan'  => MohonRequest::where('step', '>=', 1)->count(),
            'agihan'      => MohonDistributionRequest::count(),
            'penghantaran'=> MohonDistributionItemDelivery::count(),
            // Agihan where ALL items have been accepted
            'penerimaan'  => MohonDistributionRequest::whereHas('mohonDistributionItems')
                                ->whereDoesntHave('mohonDistributionItems', fn($q) =>
                                    $q->whereDoesntHave('mohonDistributionItemAcceptance')
                                )
                                ->count(),
        ];

        return response()->json([
            'users' => array_merge($userCounts, ['departments' => $departmentCount]),
            'inventory' => [
                'by_category' => $byCategory,
                'dicadangkan' => $dicadangkan,
                'disahkan'    => $disahkan,
            ],
            'workflow' => $workflow,
        ]);
    }
}
