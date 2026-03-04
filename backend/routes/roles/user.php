<?php
/*
* Routing for role = user
* Prefix /api/user/* 
*/
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\User\{
    MohonRequestController,
    MohonApprovalController,
    MohonItemController,
    MohonDistributionItemAcceptanceController
};

// MohonRequest
Route::get('/mohon-requests', [MohonRequestController::class, 'index']);
Route::post('/mohon-requests', [MohonRequestController::class, 'store']);
Route::get('/mohon-requests/stats', [MohonRequestController::class, 'stats']);
Route::get('/mohon-requests/{mohonRequestId}', [MohonRequestController::class, 'show']);
Route::delete('/mohon-requests/{mohonRequestId}', [MohonRequestController::class, 'delete']);

// MohonApproval
Route::get('/mohon-approvals/managers', [MohonApprovalController::class, 'managers']); 
Route::post('/mohon-approvals/{mohonRequestId}', [MohonApprovalController::class, 'store']);

// MohonItem
Route::get('/mohon-items/categories', [MohonItemController::class, 'categories']);
Route::get('/mohon-items/{mohonRequestId}', [MohonItemController::class, 'index']);
Route::post('/mohon-items/{mohonRequestId}', [MohonItemController::class, 'store']);
Route::get('/mohon-items/show/{id}', [MohonItemController::class, 'show']);
Route::put('/mohon-items/{id}', [MohonItemController::class, 'update']);
Route::delete('/mohon-items/{id}', [MohonItemController::class, 'delete']);

// User viewing approved Agihan
Route::get('/agihan', [MohonRequestController::class, 'agihan']);

// User accepting Agihan
// MohonDistributionAcceptance
Route::get('/mohon-distribution-item-acceptances/{mohonDistributioItemId}', [MohonDistributionItemAcceptanceController::class, 'show']);
Route::post('/mohon-distribution-item-acceptances/{mohonDistributioItemId}', [MohonDistributionItemAcceptanceController::class, 'updateOrCreate']);