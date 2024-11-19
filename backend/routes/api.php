<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\{
    Auth\AuthController,
    Global\MohonRequestController,
};
Auth::routes();

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

// Auth
Route::group(['middleware' => ['guest']], function () {
    // Auth-related routes
    Route::post('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/login-by-nric', [AuthController::class, 'loginByNric']);
    Route::post('/password/email', [AuthController::class, 'email']);
    Route::post('/password/reset', [AuthController::class, 'resetPassword']);

});

// Role user
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum')->name('logout');
    Route::get('/mohon-requests/{id}', [MohonRequestController::class, 'show']);
});




