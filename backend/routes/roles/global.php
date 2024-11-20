<?php
/*
* Routing for role = global
* Prefix /api/global/* 
*/
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Global\{
    AccountController,
    UserDepartmentController,
    MohonRequestController
};

// Account Management
Route::get('/account', [AccountController::class, 'show'])->middleware(['auth', 'verified']);
Route::put('/account', [AccountController::class, 'update']);

// UserDepartment
Route::get('/user-departments', [UserDepartmentController::class, 'index']);

// MohonRequestController
Route::get('/mohon-requests/{id}', [MohonRequestController::class, 'show']);

    Route::get('/nasi', function () {
        return 'lemak';
    });


