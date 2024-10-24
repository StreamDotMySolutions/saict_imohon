<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\MohonApprovalService;
use App\Http\Requests\MohonApproval\UpdateRequest;
use App\Http\Requests\MohonApproval\StoreRequest;
USE App\Models\User;

class MohonApprovalController extends Controller
{

    public function listManager()
    {
        $managers = array();
        
        // to list all managers ( that same department with user)
        $user = auth('sanctum')->user();
        $userDepartmentId = $user->userProfile->userDepartment->id; // User Department ID
        
        //\Log::info($userDepartmentId);

        //$managers = \App\Models\User::all();

        // Query users with the same department ID and the role 'manager'
        $managers = User::whereHas('userProfile.userDepartment', function($query) use ($userDepartmentId) {
            $query->where('id', $userDepartmentId);
        })->role('manager')->get();
        
        return response()->json([
            'managers' => $managers,
        ]);
    }

    // User process MohonRequest from step 1 to 2 
    public function byUser(StoreRequest $request, $mohonRequestId)
    {

        $mohonApprovalService = MohonApprovalService::storeByUser($request, $mohonRequestId);

        if($mohonApprovalService)
        {
            return response()->json([
                'message' => 'Permohonan ke Pelulus 1 berjaya diterima',
            ]);
        } else {
            return response()->json([
                'message' => 'Permohonan ke Pelulus 1 gagal',
            ],422);
        }
    }

    // Manager process MohonRequest step = 2 to step = 3
    public function byManager(UpdateRequest $request, $mohonRequestId)
    {
        //\Log::info($request);
        $mohonApprovalService = MohonApprovalService::storeByManager($request, $mohonRequestId);

        if($mohonApprovalService)
        {
            return response()->json([
                'message' => 'Permohonan ke Admin berjaya diterima',
            ]);
        } else {
            return response()->json([
                'message' => 'Permohonan ke Admin gagal',
            ],422);
        }
    }

    // Admin process MohonRequest step = 3 to step = 4
    public function byAdmin(UpdateRequest $request, $mohonRequestId)
    {
        //\Log::info($request);
        $mohonApprovalService = MohonApprovalService::storeByAdmin($request, $mohonRequestId);

        if($mohonApprovalService)
        {
            return response()->json([
                'message' => 'Permohonan berjaya diproses',
            ]);
        } else {
            return response()->json([
                'message' => 'Permohonan gagal diproses',
            ],422);
        }
    }



    // Boss process MohonRequest step = 3 to step = 4
    // public function byBoss(UpdateRequest $request, $mohonRequestId)
    // {
    //     //\Log::info($request);
    //     $mohonApprovalService = MohonApprovalService::storeStep4($request, $mohonRequestId);

    //     if($mohonApprovalService)
    //     {
    //         return response()->json([
    //             'message' => 'Permohonan ke Pelulus 3 berjaya diterima',
    //         ]);
    //     } else {
    //         return response()->json([
    //             'message' => 'Permohonan ke Pelulus 3 gagal',
    //         ],422);
    //     }
    // }
}
