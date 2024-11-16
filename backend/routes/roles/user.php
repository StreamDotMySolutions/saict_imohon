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
};

// MohonRequest
Route::get('/mohon-requests', [MohonRequestController::class, 'index']); 
Route::post('/mohon-requests', [MohonRequestController::class, 'store']);
Route::get('/mohon-requests/{id}', [MohonRequestController::class, 'show']);
Route::delete('/mohon-requests/{id}', [MohonRequestController::class, 'delete']);

// MohonApproval
Route::get('/mohon-approvals/managers', [MohonApprovalController::class, 'managers']); 