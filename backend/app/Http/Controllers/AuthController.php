<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;

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

class AuthController extends Controller
{

    public function register(RegisterRequest $request)
    {
        \Log::info($request);
        $user = User::create([
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ]);

        $user->assignRole('user');
        $profile = $request->merge(['user_id' => $user->id]);
        UserProfile::create($profile->except(['email','password']));

        return response()->json(['message' => 'success']);

    }

    public function login(AuthRequest $request)
    {

        // attempt to authenticate
        $request->authenticate();

        // create token in User Model
        $token = Auth::user()->createToken('API Token')->plainTextToken;

        // User, Profile
        $user = User::where('id', Auth::user()->id)->with(['profile.userDepartment'])->first();

        //\Log::info($user);
        $user['role'] = $user->roles->pluck('name')[0];

        return response()->json([
            'message' => 'Authentication Success',
            'token' => $token,
            'user' => $user
        ]);
    }

    public function logout()
    {
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
