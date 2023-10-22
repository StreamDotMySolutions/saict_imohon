<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\{
    UserController,
    UserDepartmentController,
    CategoryController,
    AuthController,
    AccountController,
};
Auth::routes();
// Auth-related routes
Route::post('/login', [AuthController::class, 'store'])->name('login');
Route::get('/logout', [AuthController::class, 'delete'])->middleware('auth:sanctum')->name('logout');
Route::post('/password/email', [AuthController::class, 'email']);
Route::post('/password/reset', [AuthController::class, 'resetPassword']);


// Account Related
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/account', [AccountController::class, 'show']);
    Route::put('/account', [AccountController::class, 'update']);

    Route::get('/user-departments', [UserDepartmentController::class, 'index']);
});

Route::group(['middleware' => ['auth:sanctum','role:system|admin']], function () {
    // User-related routes
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::put('/users/{user}', [UserController::class, 'update']);
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

