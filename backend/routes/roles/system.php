<?php
/*
* Routing for role = system
* Prefix /api/system/* 
*/
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\System\{
    UserDepartmentController,
    CategoryController
};

// UserDepartment Management
Route::get('/user-departments', [UserDepartmentController::class, 'index']);
Route::post('/user-departments', [UserDepartmentController::class, 'store']);
Route::delete('/user-departments/{userDepartment}', [UserDepartmentController::class, 'destroy']);
Route::put('/user-departments/{userDepartment}', [UserDepartmentController::class, 'update']);
Route::patch('/user-departments/ordering/{userDepartment}/{direction}', [UserDepartmentController::class, 'ordering']);

// Category Management
Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);
Route::put('/categories/{category}', [CategoryController::class, 'update']);
Route::patch('/categories/ordering/{category}/{direction}', [CategoryController::class, 'ordering']);
