<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\{
    Auth\AuthController,
};

use App\Http\Controllers\Global\{
    AccountController,
};

Auth::routes();
Route::group(['middleware' => ['guest']], function () {
    // Auth-related routes
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/login-by-nric', [AuthController::class, 'loginByNric']);
    Route::post('/password/email', [AuthController::class, 'email']);
    Route::post('/password/reset', [AuthController::class, 'resetPassword']);
    Route::get('/global/hello', function () {
        return 'world';
    });
});

// Role user
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/logged-user', [AuthController::class, 'loggedUser']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum')->name('logout');
    Route::get('/account', [AccountController::class, 'show'])->middleware(['auth', 'verified']);
    Route::put('/account', [AccountController::class, 'update']);

});




