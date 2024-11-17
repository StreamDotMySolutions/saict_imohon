<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\{

    Admin\UserController,
    Admin\AgihanController,
    Admin\InventoryController,
    Admin\AdminMohonRequestController,
    Admin\ManageMohonController,
    Admin\ManageMohonDistributionController,

    //User\UserMohonRequestController,
    Auth\AuthController,

    System\UserDepartmentController,
    System\CategoryController,

    Global\AccountController,
    ApplicationController,
 
    ItemController,
    RequestController,
    StatisticsController,

    DistributionController,
    DistributionApprovalController,
    DistributionAcceptanceController,

    MohonRequestController,
    MohonItemController,
    MohonApprovalController,
    MohonDistributionRequestController,
    MohonDistributionItemController,
    MohonDistributionItemDeliveryController,
    MohonDistributionItemAcceptanceController,
    MohonDistributionApprovalController,

};


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {

    $user = $request->user(); // Get the authenticated user
    
    // Retrieve the user's role using Spatie
    $role = $user->roles->pluck('name')->first();

    $user['role'] = $role;

    return response()->json([
        'message' => 'Logged user info',
        'user' => $user,
        'role' => $role,
    ]);

});

Auth::routes();

Route::get('/welcome', function () {
    return response()->json(['message' => 'hello']);
});


// Role guest
Route::group(['middleware' => ['guest']], function () {
    // Auth-related routes
    Route::post('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/login-by-nric', [AuthController::class, 'loginByNric']);
    Route::post('/password/email', [AuthController::class, 'email']);
    Route::post('/password/reset', [AuthController::class, 'resetPassword']);
    Route::get('/user-departments', [UserDepartmentController::class, 'index']);
});

// Role user
Route::group(['middleware' => ['auth:sanctum']], function () {


    Route::get('/account', [AccountController::class, 'show'])->middleware(['auth', 'verified']);
    Route::put('/account', [AccountController::class, 'update']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum')->name('logout');


    Route::get('/statistics/{item}/requested', [StatisticsController::class, 'requested']);

    // mohon-requests
    // Route::get('/mohon', [MohonController::class, 'index']); // for everyone
    // Route::post('/mohon', [MohonController::class, 'store']);
    Route::get('/mohon-requests/{id}', [MohonRequestController::class, 'show']);
    // Route::put('/mohon/{id}', [MohonController::class, 'update']);
    // Route::delete('/mohon/{id}', [MohonController::class, 'delete']);

    // close || open ticket by Admin
    Route::get('/mohon/ticket/{mohonRequest}', [MohonController::class, 'ticketStatus']);
    Route::put('/mohon/ticket/{mohonRequest}', [MohonController::class, 'ticketStore']);




    // mohon item ( by user )
    // Route::get('/mohon-items/categories', [MohonItemController::class, 'categories']);
    // Route::get('/mohon-items/{mohonRequestId}', [MohonItemController::class, 'index']);
    // Route::post('/mohon-items/{mohonRequestId}', [MohonItemController::class, 'store']);
    // Route::get('/mohon-items/show/{id}', [MohonItemController::class, 'show']);
    // Route::put('/mohon-items/{id}', [MohonItemController::class, 'update']);
    // Route::delete('/mohon-items/{id}', [MohonItemController::class, 'delete']);


    
    // mohon approval
    Route::post('/mohon-approval/by-user/{mohonRequestId}', [MohonApprovalController::class, 'byUser']);
    Route::get('/mohon-approval/list-managers', [MohonApprovalController::class, 'listManager']);
    Route::put('/mohon-approval/by-manager/{mohonRequestId}', [MohonApprovalController::class, 'byManager']);
    Route::put('/mohon-approval/by-admin/{mohonRequestId}', [MohonApprovalController::class, 'byAdmin']);
    Route::put('/mohon-approval/by-boss/{mohonRequestId}', [MohonApprovalController::class, 'byBoss']);

    
    // mohon distribution request
    Route::get('/mohon-distribution-requests/by-boss/{status}', [MohonDistributionRequestController::class, 'byBoss']); 
    //Route::get('/mohon-distribution-requests/{mohonRequestId}', [MohonDistributionRequestController::class, 'index']); 
    //Route::post('/mohon-distribution-requests/{mohonRequestId}', [MohonDistributionRequestController::class, 'store']);
    // mohon-distribution from admin to boss ( requesting approval )
    Route::post('/mohon-distribution-requests/by-admin/{mohonDistributionRequestId}', [MohonDistributionApprovalController::class, 'byAdmin']);
    //Route::delete('/mohon-distribution-requests/by-admin/{mohonDistributionRequestId}', [MohonDistributionApprovalController::class, 'byAdmin']);
   


    //Route::get('/manage/mohon-distribution-requests', [MohonDistributionRequestController::class, 'manage']); 


    // mohon-distribution
    // from MohonApproval role= boss
    Route::get('/mohon-distribution/{id}', [MohonDistributionRequestController::class, 'show']);
    Route::put('/mohon-distribution/{id}', [MohonDistributionRequestController::class, 'update']);
    Route::delete('/mohon-distribution/{id}', [MohonDistributionRequestController::class, 'delete']);

    
    // mohon distribution approval from boss to approve request agihan from admin
    Route::put('/mohon-distribution-approval/by-boss/{mohonDistributionRequestId}', [MohonDistributionApprovalController::class, 'byBoss']);


    // mohon distribution item
    Route::get('/mohon-distribution-items/vendors', [MohonDistributionItemController::class, 'vendors']);
    Route::get('/mohon-distribution-items/categories', [MohonDistributionItemController::class, 'categories']);
    Route::get('/mohon-distribution-items/{mohonRequestId}', [MohonDistributionItemController::class, 'index']);
    Route::post('/mohon-distribution-items/{mohonRequestId}', [MohonDistributionItemController::class, 'store']);
    Route::get('/mohon-distribution-items/show/{id}', [MohonDistributionItemController::class, 'show']);
    Route::put('/mohon-distribution-items/received/{id}', [MohonDistributionItemController::class, 'received']);
    Route::put('/mohon-distribution-items/{id}', [MohonDistributionItemController::class, 'update']);
    Route::delete('/mohon-distribution-items/{id}', [MohonDistributionItemController::class, 'delete']);
    
    Route::post('/mohon-distribution-items/{mohonDistributionRequestId}/create', [MohonDistributionItemController::class, 'create']);
    Route::post('/mohon-distribution-items/{mohonDistributionRequestId}/sync', [MohonDistributionItemController::class, 'sync']);
    Route::post('/mohon-distribution-items/{mohonDistributionRequestId}/remove', [MohonDistributionItemController::class, 'remove']);
    Route::get('/mohon-distribution-items/{mohonDistributionRequestId}/items', [MohonDistributionItemController::class, 'items']);
    Route::get('/mohon-distribution-items/{mohonRequestId}/{agihanRequestId}/check', [MohonDistributionItemController::class, 'listMohonItemsInMohonDistributionItems']);
    
    Route::post('/mohon-distribution-item-deliveries/{mohonDistributioItemId}/updateOrCreate', [MohonDistributionItemDeliveryController::class, 'updateOrCreate']);
    
    // User to acknowledge of receiving the requested item
    Route::post('/mohon-distribution-item-acceptances/{mohonDistributioItemId}/updateOrCreate', [MohonDistributionItemAcceptanceController::class, 'updateOrCreate']);
    Route::get('/mohon-distribution-item-acceptances/{mohonDistributioItemId}/show', [MohonDistributionItemAcceptanceController::class, 'show']);

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

    // mohon administration
    Route::get('/administrations/mohon', [ManageMohonController::class, 'index']);
    Route::get('/administrations/mohon/{id}', [ManageMohonController::class, 'show']);
    Route::put('/administrations/mohon/{id}', [ManageMohonController::class, 'update']);
    Route::delete('/administrations/mohon/{id}', [ManageMohonController::class, 'delete']);

    // mohon distribution administration
    Route::get('/administrations/mohon-distribution-requests', [ManageMohonDistributionController::class, 'index']);
    Route::delete('/administrations/mohon-distribution-requests/{id}', [ManageMohonDistributionController::class, 'delete']);


});

// Distribution
Route::group(['middleware' => ['auth:sanctum','role:system|admin|boss']], function () {

    // DistributionApproval Related routes
    Route::apiResource('distribution-approvals', DistributionApprovalController::class);
    Route::apiResource('distributions', DistributionController::class);
});
    
// Role system
Route::group(['middleware' => ['auth:sanctum','role:system|admin']], function () {
    
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


// Role system|admin | agihan
Route::group(['middleware' => ['auth:sanctum','role:system|admin']], function () {
    Route::get('/agihan/mohon', [AgihanController::class, 'mohon']);
});

// Route::group(['middleware' => ['auth:sanctum','role:user']], function () {

//    // mohon
//    Route::get('/user/mohon-requests', [UserMohonRequestController::class, 'index']); 
//    Route::post('/user/mohon-requests', [UserMohonRequestController::class, 'store']);
//    Route::get('/user/mohon-requests/{id}', [UserMohonRequestController::class, 'show']);
//    //Route::put('/mohon/{id}', [UserMohonRequestController::class, 'update']);
//    Route::delete('/user/mohon-requests/{id}', [UserMohonRequestController::class, 'delete']);
   
// });



Route::group(['middleware' => ['auth:sanctum','role:admin']], function () {

    // GET /api/admin/mohon-requests
    Route::get('/admin/mohon-requests', [AdminMohonRequestController::class, 'index']);

    // Inventory Related routes
    Route::get('/inventories', [InventoryController::class, 'index']);
    Route::post('/inventories', [InventoryController::class, 'store']);
    Route::get('/inventories/{inventory}', [InventoryController::class, 'show']);
    Route::put('/inventories/{inventory}', [InventoryController::class, 'update']);
    Route::delete('/inventories/{inventory}', [InventoryController::class, 'delete']);
});
