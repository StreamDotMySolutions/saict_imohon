<?php
/*
* Routing for role = admin
* Prefix /api/admin/* 
*/
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Admin\{
    MohonRequestController,
    MohonApprovalController,
    ManageMohonDistributionController,
    MohonDistributionRequestController,
    MohonDistributionItemController,
    MohonDistributionApprovalController,
    MohonDistributionItemDeliveryController,
    UserController,
    InventoryController,
    CategoryController,
    AgihanController
};
// Agihan (list approved mohon requests for distribution)
Route::get('/agihan/mohon', [AgihanController::class, 'mohon']);

// MohonApproval
Route::put('/mohon-approvals/{mohonRequestId}', [MohonApprovalController::class, 'update']);

// MohonDistributionRequestApproval
Route::post('/mohon-distribution-approvals/{mohonDistributionRequestId}', [MohonDistributionApprovalController::class, 'store']);

// MohonDistributionRequest
Route::get('/mohon-distribution-requests/{mohonRequestId}/index', [MohonDistributionRequestController::class, 'index']); 
Route::post('/mohon-distribution-requests/{mohonRequestId}', [MohonDistributionRequestController::class, 'store']);
Route::get('/mohon-distribution-requests/{id}', [MohonDistributionRequestController::class, 'show']);
Route::put('/mohon-distribution-requests/{id}', [MohonDistributionRequestController::class, 'update']);
Route::delete('/mohon-distribution-requests/{id}', [MohonDistributionRequestController::class, 'delete']);

// MohonDistributionItem
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



// User Management
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{user}', [UserController::class, 'show']);
Route::put('/users/{user}', [UserController::class, 'update']);
Route::patch('/users/{user}/approve', [UserController::class, 'approve']);
Route::patch('/users/{user}/disable', [UserController::class, 'disable']);
Route::delete('/users/{user}', [UserController::class, 'delete']);

// Inventory Management
Route::get('/inventories', [InventoryController::class, 'index']);
Route::post('/inventories', [InventoryController::class, 'store']);
Route::get('/inventories/{inventory}', [InventoryController::class, 'show']);
Route::put('/inventories/{inventory}', [InventoryController::class, 'update']);
Route::delete('/inventories/{inventory}', [InventoryController::class, 'delete']);

// Category Management
Route::get('/categories', [CategoryController::class, 'index']);

// MohonRequest Management
Route::get('/mohon-requests', [MohonRequestController::class, 'index']);
Route::delete('/mohon-requests/{mohonRequestId}', [MohonRequestController::class, 'delete']);

// MohonDistribution Management
Route::get('/manage/mohon-distribution-requests', [ManageMohonDistributionController::class, 'index']);
Route::delete('/manage/mohon-distribution-requests/{id}', [ManageMohonDistributionController::class, 'delete']);