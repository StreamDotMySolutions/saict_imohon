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
};


// MohonDistributionRequest
Route::get('/mohon-distribution-requests/{mohonRequestId}/index', [MohonDistributionRequestController::class, 'index']); 
Route::post('/mohon-distribution-requests/{mohonRequestId}', [MohonDistributionRequestController::class, 'store']);
Route::get('/mohon-distribution-requests/{id}', [MohonDistributionRequestController::class, 'show']);
Route::put('/mohon-distribution-requests/{id}', [MohonDistributionRequestController::class, 'update']);
Route::delete('/mohon-distribution-requests/{id}', [MohonDistributionRequestController::class, 'delete']);


// MohonDistributionItem belongsTo MohonDistributionRequest
Route::get('/mohon-distribution-items/show/{id}', [MohonDistributionItemController::class, 'show']);
Route::get('/mohon-distribution-items/vendors', [MohonDistributionItemController::class, 'vendors']);
Route::get('/mohon-distribution-items/{mohonRequestId}', [MohonDistributionItemController::class, 'index']);
Route::get('/mohon-distribution-items/{mohonRequestId}/{agihanRequestId}/check', [MohonDistributionItemController::class, 'listMohonItemsInMohonDistributionItems']);
Route::post('/mohon-distribution-items/{mohonDistributionRequestId}/create', [MohonDistributionItemController::class, 'create']);
Route::post('/mohon-distribution-items/{mohonDistributionRequestId}/remove', [MohonDistributionItemController::class, 'remove']);
Route::post('/mohon-distribution-items/{mohonDistributionRequestId}/sync', [MohonDistributionItemController::class, 'sync']);
