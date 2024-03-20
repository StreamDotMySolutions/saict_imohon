<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;
use App\Http\Requests\AuthByNricRequest;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\UserProfile;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

use Illuminate\Support\Facades\Password;
use App\Http\Requests\EmailRequest;
use App\Http\Requests\ResetRequest;
use App\Http\Requests\RegisterRequest;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Mail;
use App\Mail\MyTestEmail;

class AuthController extends Controller
{

    public function register(RegisterRequest $request)
    {
        //\Log::info($request);
        $user = User::create([
            'name' => $request->input('name'),
            'nric' => $request->input('nric'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ]);

        $user->assignRole('user');
        $profile = $request->merge(['user_id' => $user->id]);
        $created = UserProfile::create($profile->except(['email','password','name','nric']));

        if($created){
            //\Log::info('email');
            // $user->markEmailAsVerified();
            // Mail::to($request->input('email'))->send(new MyTestEmail($request->input('name')));
            // $user->sendEmailVerificationNotification();
            event(new Registered($user));
        }

        return response()->json(['message' => 'success']);
    }

    public function loginByNric(AuthByNricRequest $request)
    {
        //\Log::info($request);
        // attempt to authenticate
        $request->authenticate();

        $user = User::where('id', Auth::user()->id)
                        ->where('is_approved', true) // only is_approved=true
                        ->with(['profile.userDepartment'])
                        ->first();

        // create token in User Model
        $token = Auth::user()->createToken('API Token')->plainTextToken;
        $user['role'] = $user->roles->pluck('name')[0];

        if ($user) {
            // create token in User Model
            $token = Auth::user()->createToken('API Token')->plainTextToken;
            $user['role'] = $user->roles->pluck('name')[0];

            return response()->json([
                'message' => 'Authentication Success',
                'token' => $token,
                'user' => $user
            ]);

        } else {
            return response()->json([
                'message' => 'User not approved or not found',
            ], 401);
        }

        // // make attempt
        // $credentials = [
        //     'nric' => $request->input('nric'),
        //     'password' => $request->input('password'),
        // ];

        // if (Auth::attempt($credentials)) {
        //     // Authentication was successful
        //     //\Log::info('success');

        //     $user = User::where('id', Auth::user()->id)
        //                 ->where('is_approved', true) // only is_approved=true
        //                 ->with(['profile.userDepartment'])
        //                 ->first();

        //     // create token in User Model
        //     $token = Auth::user()->createToken('API Token')->plainTextToken;
        //     $user['role'] = $user->roles->pluck('name')[0];

        //     if ($user) {
        //         // create token in User Model
        //         $token = Auth::user()->createToken('API Token')->plainTextToken;
        //         $user['role'] = $user->roles->pluck('name')[0];
    
        //         return response()->json([
        //             'message' => 'Authentication Success',
        //             'token' => $token,
        //             'user' => $user
        //         ]);
    
        //     } else {
        //         return response()->json([
        //             'message' => 'User not approved or not found',
        //         ], 401);
        //     }

        // } else {
        //     // Authentication failed
        //     return response()->json([
        //         'message' => 'Invalid credentials',
        //     ], 401);
        // }
    }

    public function login(AuthRequest $request)
    {
        // attempt to authenticate
        $request->authenticate();

        // find user
        $user = User::where('id', Auth::user()->id)
                ->where('is_approved', true) // only is_approved=true
                ->with(['profile.userDepartment'])
                ->first();

        if ($user) {
            // create token in User Model
            $token = Auth::user()->createToken('API Token')->plainTextToken;
            $user['role'] = $user->roles->pluck('name')[0];

            \Log::info('login-' . Auth::user()->email);
            return response()->json([
                'message' => 'Authentication Success',
                'token' => $token,
                'user' => $user
            ]);

        } else {
            return response()->json([
                'message' => 'User not approved or not found',
            ], 401);
        }
    }

    public function logout()
    {
        //\Log::info('logout-' . Auth::user()->email);
        // revoke the token
        Auth::user()->tokens()->delete();

        return response()->json([
            'message' => 'Logged out',
        ],200);

    }
   
    public function email(EmailRequest $request)
    {

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
        ? response()->json($status,200) // success
        : response()->json($status,422); // failed
    }

    public function resetPassword(ResetRequest $request)
    {

        // success in validation, now reset the password
        $status = Password::reset(
            //$request->only('email', 'password', 'password_confirmation', 'token'),
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($request->password),
                    'remember_token' => Str::random(60),
                ])->save();

                // dev purpose
                //$user->tokens()->delete(); // delete the token in DB
            }
        );

        // success
        if($status == Password::PASSWORD_RESET){
            return response([
                'message' => 'Password reset successfully'
            ]);
        }

        // error
        return response([
            'message' => __($status)
        ],422);
    }
}
