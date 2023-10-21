<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

use Illuminate\Support\Facades\Password;

class AuthController extends Controller
{
    public function store(AuthRequest $request)
    {

        // attempt to authenticate
        $request->authenticate();

        // create token in User Model
        $token = Auth::user()->createToken('API Token')->plainTextToken;

        // User, Profile
        //$user = User::where('id',Auth::user('id'))->with(['profile.userDepartment'])->first();
        $user = User::where('id', Auth::user()->id)->with(['profile.userDepartment'])->first();

        //\Log::info($user);
        $user['role'] = $user->roles->pluck('name')[0];

        return response()->json([
            'message' => 'Authentication Success',
            'token' => $token,
            'user' => $user
        ]);
    }

    public function delete()
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
}
