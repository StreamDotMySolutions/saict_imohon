<?php

use Illuminate\Support\Facades\Route;
use App\Mail\MyTestEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Auth
//Auth::routes();

//\Log::info(\Request::all());

Route::get('/', function () {
    return view('welcome');
});

Route::get('/mail', function() {
    $name = "Funny Coder";

    // The email sending is done using the to method on the Mail facade
    Mail::to('azril.nazli@gmail.com')->send(new MyTestEmail($name));
});


/*
* Registered user want to verify email
*/
Route::get('/email/verify/{id}/{hash}', function (Request $request, $id, $hash) {
    
    $frontendUrl = env('FRONTEND_URL');
    $user = Auth::loginUsingId($id); // need to login first and get $user object

    // compare id and hash
    if ( hash_equals((string) $id,(string) $user->id) && hash_equals($hash, sha1($user->getEmailForVerification()) ) ) {

        $user->markEmailAsVerified(); // user verified, can user verified middleware on route

        //return response()->json(['message' => "Email berjaya disahkan"]);
       
        return Redirect::to($frontendUrl . '/verified');

    } else {

        return Redirect::to($frontendUrl . '/verify-failed');
    } 
})->name('verification.verify');

/*
* Registered user want to verify email
*/
Route::get('/api/email/verify/{id}/{hash}', function (Request $request, $id, $hash) {
    
    $frontendUrl = env('FRONTEND_URL');
    $user = Auth::loginUsingId($id); // need to login first and get $user object

    // compare id and hash
    if ( hash_equals((string) $id,(string) $user->id) && hash_equals($hash, sha1($user->getEmailForVerification()) ) ) {

        $user->markEmailAsVerified(); // user verified, can user verified middleware on route

        //return response()->json(['message' => "Email berjaya disahkan"]);
       
        return Redirect::to($frontendUrl . '/verified');

    } else {

        return Redirect::to($frontendUrl . '/verify-failed');
    } 
})->name('verification.verify');

// Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
//     $test = $request->fulfill();
//     \Log::info($test);
//     \Log::info('verified');
//     //return redirect('/login');
// })->middleware(['auth', 'signed'])->name('verification.verify');


Route::get('/login', function () {
        // redirect to reactjs login
        echo 'login';
    }
)->name('login');
