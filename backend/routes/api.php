<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\{
    UserController,
    UserDepartmentController,
    CategoryController,
    AuthController,
    AccountController,
    ApplicationController,
    InventoryController,
    ItemController,
    RequestController,
    StatisticsController,
    DistributionController,
    DistributionApprovalController,
    DistributionAcceptanceController,
    MohonController,
    MohonItemController,
};
Auth::routes();

Route::get('/welcome', function () {
    return response()->json(['message' => 'welcome']);
});


// Role guest
Route::group(['middleware' => ['guest']], function () {
    // Auth-related routes
    Route::post('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/login-by-nric', [AuthController::class, 'loginByNric']);
    Route::post('/password/email', [AuthController::class, 'email']);
    Route::post('/password/reset', [AuthController::class, 'resetPassword']);
    Route::get('/user-departments', [UserDepartmentController::class, 'index']);
});

// Role user
Route::group(['middleware' => ['auth:sanctum']], function () {


    Route::get('/account', [AccountController::class, 'show']);
    Route::put('/account', [AccountController::class, 'update']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum')->name('logout');
    Route::resource('requests', RequestController::class);

    Route::get('/statistics/{item}/requested', [StatisticsController::class, 'requested']);

    // mohon
    Route::get('/mohon', [MohonController::class, 'index']);
    Route::post('/mohon', [MohonController::class, 'store']);
    Route::get('/mohon/{id}', [MohonController::class, 'show']);
    Route::put('/mohon/{id}', [MohonController::class, 'update']);
    Route::delete('/mohon/{id}', [MohonController::class, 'delete']);

    // mohon item
    Route::get('/mohon-items/categories', [MohonItemController::class, 'categories']);
    Route::get('/mohon-items/{mohonRequestId}', [MohonItemController::class, 'index']);
    Route::post('/mohon-items/{mohonRequestId}', [MohonItemController::class, 'store']);
    // Route::get('/mohon-items/{id}', [MohonItemController::class, 'show']);
    // Route::put('/mohon-items/{id}', [MohonItemController::class, 'update']);
    // Route::delete('/mohon-items/{id}', [MohonItemController::class, 'delete']);


    // application
    Route::get('/applications/items', [CategoryController::class, 'applicationItems']);
    Route::get('/applications', [ApplicationController::class, 'index']);
    Route::get('/applications/{application}', [ApplicationController::class, 'show']);
    Route::post('/applications', [ApplicationController::class, 'store']);
    Route::put('/applications/{application}', [ApplicationController::class, 'update']);
    Route::delete('/applications/{application}', [ApplicationController::class, 'delete']);

    // approval 
    Route::post('/applications/approval/{application}/{status}/by-manager', [ApplicationController::class, 'approvalByManager']);
    Route::post('/applications/approval/{application}/{status}/by-admin', [ApplicationController::class, 'approvalByAdmin']);
    Route::get('/applications/approval/{application}/{status}/by-boss', [Controller::class, 'approvalByBoss']);

    // distribution-acceptances
    Route::apiResource('distribution-acceptances', DistributionAcceptanceController::class);
});

// Role system|admin 
Route::group(['middleware' => ['auth:sanctum','role:system|admin']], function () {

    // User-related routes
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::put('/users/{user}', [UserController::class, 'update']);
    Route::patch('/users/{user}/approve', [UserController::class, 'approve']);
    Route::patch('/users/{user}/disable', [UserController::class, 'disable']);
    Route::delete('/users/{user}', [UserController::class, 'delete']);

    // Inventory Related routes
    Route::get('/inventories', [InventoryController::class, 'index']);
    Route::post('/inventories', [InventoryController::class, 'store']);
    Route::get('/inventories/{inventory}', [InventoryController::class, 'show']);
    Route::put('/inventories/{inventory}', [InventoryController::class, 'update']);
    Route::delete('/inventories/{inventory}', [InventoryController::class, 'delete']);
});

// Distribution
Route::group(['middleware' => ['auth:sanctum','role:system|admin|boss']], function () {

    // DistributionApproval Related routes
    Route::apiResource('distribution-approvals', DistributionApprovalController::class);
    Route::apiResource('distributions', DistributionController::class);
});
    
// Role system
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