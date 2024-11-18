<?php
/*
* Routing for role = admin
* Prefix /api/admin/* 
*/
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Admin\{
    MohonDistributionRequestController,
    MohonDistributionItemController,
    MohonDistributionApprovalController,
    MohonDistributionItemDeliveryController
};

// MohonDistributionRequestApproval
Route::post('/mohon-distribution-approvals/{mohonDistributionRequestId}', [MohonDistributionApprovalController::class, 'store']);


// MohonDistributionRequest
Route::get('/mohon-distribution-requests/{mohonRequestId}/index', [MohonDistributionRequestController::class, 'index']); 
Route::post('/mohon-distribution-requests/{mohonRequestId}', [MohonDistributionRequestController::class, 'store']);
Route::get('/mohon-distribution-requests/{id}', [MohonDistributionRequestController::class, 'show']);
Route::put('/mohon-distribution-requests/{id}', [MohonDistributionRequestController::class, 'update']);
Route::delete('/mohon-distribution-requests/{id}', [MohonDistributionRequestController::class, 'delete']);

// MohonDistributionItem belongsTo MohonDistributionRequest
Route::get('/mohon-distribution-items/vendors', [MohonDistributionItemController::class, 'vendors']);
Route::get('/mohon-distribution/{id}', [MohonDistributionRequestController::class, 'show']);
Route::put('/mohon-distribution/{id}', [MohonDistributionRequestController::class, 'update']);
Route::delete('/mohon-distribution/{id}', [MohonDistributionRequestController::class, 'delete']);

// add item 
Route::post('/mohon-distribution-items/{mohonRequestId}', [MohonDistributionItemController::class, 'store']);

Route::post('/mohon-distribution-items/{mohonDistributionRequestId}/create', [MohonDistributionItemController::class, 'create']);
Route::post('/mohon-distribution-items/{mohonDistributionRequestId}/sync', [MohonDistributionItemController::class, 'sync']);
Route::post('/mohon-distribution-items/{mohonDistributionRequestId}/remove', [MohonDistributionItemController::class, 'remove']);
Route::get('/mohon-distribution-items/{mohonDistributionRequestId}/items', [MohonDistributionItemController::class, 'items']);
Route::get('/mohon-distribution-items/{mohonRequestId}/{agihanRequestId}/check', [MohonDistributionItemController::class, 'listMohonItemsInMohonDistributionItems']);

// After Boss Approved the Request, admin need to update the Detail for each Item
Route::get('/mohon-distribution-items/{mohonDistributionItemId}/show', [MohonDistributionItemController::class, 'show']);

// Delivery Detail
Route::post('/mohon-distribution-item-deliveries/{mohonDistributioItemId}', [MohonDistributionItemDeliveryController::class, 'store']);