<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;

Route::post('/users/store', [UserController::class, 'store']);

Route::get('/categories/index', [CategoryController::class, 'index']);
Route::post('/categories/store', [CategoryController::class, 'store']);
