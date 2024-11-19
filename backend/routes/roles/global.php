<?php
/*
* Routing for role = global
* Prefix /api/global/* 
*/
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Global\{
    AccountController,
    UserDepartmentController
};

// Account Management
Route::get('/account', [AccountController::class, 'show'])->middleware(['auth', 'verified']);
Route::put('/account', [AccountController::class, 'update']);

// UserDepartment
Route::get('/user-departments', [UserDepartmentController::class, 'index']);


