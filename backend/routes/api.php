<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\{

    
    Auth\AuthController,

    System\UserDepartmentController,
    System\CategoryController,

    Global\AccountController,
    Global\MohonRequestController,

    Admin\ManageMohonController,
    Admin\ManageMohonDistributionController
   

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



Route::get('/welcome', function () {
    return response()->json(['message' => 'hello']);
});

Auth::routes();
// Auth::routes([
//     'login'    => true,
//     'logout'   => true,
//     'register' => true,
//     'reset'    => true,  // for resetting passwords
//     'confirm'  => false, // for additional password confirmations
//     'verify'   => false, // for email verification
// ]);

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
    Route::get('/mohon-requests/{id}', [MohonRequestController::class, 'show']);
});

// Role system|admin 
Route::group(['middleware' => ['auth:sanctum','role:system|admin']], function () {
    // mohon administration
    // Route::get('/administrations/mohon', [ManageMohonController::class, 'index']);
    // Route::get('/administrations/mohon/{id}', [ManageMohonController::class, 'show']);
    // Route::put('/administrations/mohon/{id}', [ManageMohonController::class, 'update']);
    // Route::delete('/administrations/mohon/{id}', [ManageMohonController::class, 'delete']);

    // mohon distribution administration
    // Route::get('/administrations/mohon-distribution-requests', [ManageMohonDistributionController::class, 'index']);
    // Route::delete('/administrations/mohon-distribution-requests/{id}', [ManageMohonDistributionController::class, 'delete']);
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



