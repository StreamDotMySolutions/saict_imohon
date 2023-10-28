<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\{
    UserController,
    UserDepartmentController,
    CategoryController,
    AuthController,
    AccountController,
    ApplicationController
};
Auth::routes();

// Auth-related routes
Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum')->name('logout');
Route::post('/password/email', [AuthController::class, 'email']);
Route::post('/password/reset', [AuthController::class, 'resetPassword']);
Route::get('/user-departments', [UserDepartmentController::class, 'index']);

// Account Related
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/account', [AccountController::class, 'show']);
    Route::put('/account', [AccountController::class, 'update']);
});

// Application Related
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/applications/items', [CategoryController::class, 'applicationItems']);
    
    Route::get('/applications', [ApplicationController::class, 'index']);
    Route::get('/applications/{application}', [ApplicationController::class, 'show']);
    Route::post('/applications', [ApplicationController::class, 'store']);
    Route::put('/applications/{application}', [ApplicationController::class, 'update']);
    Route::delete('/applications/{application}', [ApplicationController::class, 'delete']);



    // approval 
    Route::get('/applications/approval/{application}/{status}/by-manager', [ApplicationController::class, 'approvalByManager']);
    Route::get('/applications/approval/{application}/{status}/by-admin', [ApplicationController::class, 'approvalByAdmin']);
    Route::get('/applications/approval/{application}/{status}/by-boss', [Controller::class, 'approvalByBoss']);
});

Route::group(['middleware' => ['auth:sanctum','role:system|admin']], function () {
    // User-related routes
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::put('/users/{user}', [UserController::class, 'update']);
    Route::patch('/users/{user}/approve', [UserController::class, 'approve']);
    Route::patch('/users/{user}/disable', [UserController::class, 'disable']);
    Route::delete('/users/{user}', [UserController::class, 'delete']);
});
    
Route::group(['middleware' => ['auth:sanctum','role:system']], function () {
    
    // User Department-related routes
    //Route::get('/user-departments', [UserDepartmentController::class, 'index']);
    Route::post('/user-departments', [UserDepartmentController::class, 'store']);
    Route::delete('/user-departments/{userDepartment}', [UserDepartmentController::class, 'destroy']);
    Route::put('/user-departments/{userDepartment}', [UserDepartmentController::class, 'update']);
    Route::patch('/user-departments/ordering/{userDepartment}/{direction}', [UserDepartmentController::class, 'ordering']);

    // Category-related routes
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);
    Route::put('/categories/{category}', [CategoryController::class, 'update']);
    Route::patch('/categories/ordering/{category}/{direction}', [CategoryController::class, 'ordering']);

});