<?php

namespace App\Services;

use App\Models\MohonRequest;
use App\Models\MohonApproval;
use App\Models\MohonItem;
use Illuminate\Support\Facades\DB;

class ItemRequestService
{
    public static function store($request)
    {
        return DB::transaction(function () use ($request) {
            $user = auth('sanctum')->user();
            $departmentId = $user->profile->user_department_id ?? null;

            // Create MohonRequest
            $mohonRequest = MohonRequest::create([
                'user_id' => $user->id,
                'title' => 'Permohonan Peralatan',
                'step' => 0,
                'status' => 'pending',
            ]);

            // Create initial MohonApproval record
            MohonApproval::create([
                'mohon_request_id' => $mohonRequest->id,
                'user_id' => $user->id,
                'requester_id' => $user->id,
                'step' => 0,
                'message' => "{$user->name} ( User ) mencipta permohonan. ",
                'status' => 'pending',
            ]);

            // Create MohonItems
            foreach ($request->input('items') as $item) {
                MohonItem::create([
                    'mohon_request_id' => $mohonRequest->id,
                    'user_id' => $user->id,
                    'category_id' => $item['category_id'],
                    'type' => $item['type'],
                    'name' => $item['name'],
                    'occupation' => $item['occupation'],
                    'mobile' => $item['mobile'],
                    'department_id' => $departmentId,
                    'building_name' => $item['building_name'],
                    'building_level' => $item['building_level'],
                    'location' => $item['location'],
                    'description' => $item['description'],
                ]);
            }

            // Submit for manager approval (step 1) + send email
            MohonApprovalService::storeByUser($request, $mohonRequest->id);

            return $mohonRequest;
        });
    }
}
