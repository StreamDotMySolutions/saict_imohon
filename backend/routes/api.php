<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\{
    UserController,
    UserDepartmentController,
    CategoryController,
    AuthController
};

Route::post('/login', [AuthController::class, 'store'])->middleware('guest')->name('login');
Route::get('/logout', [AuthController::class, 'delete'])->middleware('auth:sanctum')->name('logout');

Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{user}', [UserController::class, 'show']);

Route::get('/user-departments', [UserDepartmentController::class, 'index']);
Route::post('/user-departments', [UserDepartmentController::class, 'store']);
Route::delete('/user-departments/{userDepartment}', [UserDepartmentController::class, 'destroy']);
Route::put('/user-departments/{userDepartment}', [UserDepartmentController::class, 'update']);
Route::patch('/user-departments/ordering/{userDepartment}/{direction}', [UserDepartmentController::class, 'ordering']);

Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);
Route::put('/categories/{category}', [CategoryController::class, 'update']);
Route::patch('/categories/ordering/{category}/{direction}', [CategoryController::class, 'ordering']);

