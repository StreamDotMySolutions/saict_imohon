<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserDepartmentController;
use App\Http\Controllers\CategoryController;


Route::get('/users', [UserController::class, 'index']);
Route::post('/users/store', [UserController::class, 'store']);

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

