<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\{
    UserController,
    UserDepartmentController,
    CategoryController,
    AuthController
};

// Auth-related routes
Route::post('/login', [AuthController::class, 'store'])->middleware('guest')->name('login');
Route::get('/logout', [AuthController::class, 'delete'])->middleware('auth:sanctum')->name('logout');

// User-related routes
Route::get('/users', [UserController::class, 'index'])->middleware('auth:sanctum');
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{user}', [UserController::class, 'show'])->middleware('auth:sanctum');
Route::put('/users/{user}', [UserController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/users/{user}', [UserController::class, 'delete'])->middleware('auth:sanctum');

// User Department-related routes
Route::get('/user-departments', [UserDepartmentController::class, 'index'])->middleware('auth:sanctum');
Route::post('/user-departments', [UserDepartmentController::class, 'store'])->middleware('auth:sanctum');
Route::delete('/user-departments/{userDepartment}', [UserDepartmentController::class, 'destroy'])->middleware('auth:sanctum');
Route::put('/user-departments/{userDepartment}', [UserDepartmentController::class, 'update'])->middleware('auth:sanctum');
Route::patch('/user-departments/ordering/{userDepartment}/{direction}', [UserDepartmentController::class, 'ordering'])->middleware('auth:sanctum');

// Category-related routes
Route::get('/categories', [CategoryController::class, 'index'])->middleware('auth:sanctum');
Route::post('/categories', [CategoryController::class, 'store'])->middleware('auth:sanctum');
Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->middleware('auth:sanctum');
Route::put('/categories/{category}', [CategoryController::class, 'update'])->middleware('auth:sanctum');
Route::patch('/categories/ordering/{category}/{direction}', [CategoryController::class, 'ordering'])->middleware('auth:sanctum');

