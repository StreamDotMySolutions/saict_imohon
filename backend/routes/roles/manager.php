<?php
/*
* Routing for role = manager
* Prefix /api/manager/* 
*/
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Manager\{
    MohonRequestController,
    MohonApprovalController,
};

// Manager list all ( pending | approved | rejected ) MohonRequest
// requester : http://localhost:3000/mohon-approval/by-manager
Route::get('/mohon-requests', [MohonRequestController::class, 'index']);

// Manager manage MohonApproval for each MohonRquest ( approve | reject )
// requester : http://localhost:3000/mohon-approval/by-manager
Route::put('/mohon-approvals/{mohonRequestId}', [MohonApprovalController::class, 'update']);