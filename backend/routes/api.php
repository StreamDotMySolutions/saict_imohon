<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;

Route::post('/users/store', [UserController::class, 'store']);

Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);
Route::put('/categories/{category}', [CategoryController::class, 'update']);
Route::patch('/categories/ordering/{category}/{direction}', [CategoryController::class, 'ordering']);

