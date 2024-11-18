<?php
/*
* Routing for role = boss
* Prefix /api/boss/* 
*/
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Boss\{
    MohonDistributionRequestController,
    MohonDistributionApprovalController
};

// Boss listing all requested MohonDistributionRequest
Route::get('/mohon-distribution-requests/{status}', [MohonDistributionRequestController::class, 'index']); 

Route::get('/mohon-distribution/{id}', [MohonDistributionRequestController::class, 'show']);
Route::put('/mohon-distribution/{id}', [MohonDistributionRequestController::class, 'update']);
Route::delete('/mohon-distribution/{id}', [MohonDistributionRequestController::class, 'delete']);

// mohon distribution approval from boss to approve request agihan from admin
Route::put('/mohon-distribution-approvals/{mohonDistributionRequestId}', [MohonDistributionApprovalController::class, 'update']);

