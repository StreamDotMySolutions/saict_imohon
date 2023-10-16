<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    /**
     * Handle an incoming authentication request.
     */
    public function store(AuthRequest $request)
    {

        // attempt to authenticate
        $request->authenticate();

        // create token in User Model
        $token = Auth::user()->createToken('API Token')->plainTextToken;

        // return with 200 header success
        // return message = "Authentication Success"
        // return in JSON
        return response()->json([
            'message' => 'Authentication Success',
            'token' => $token
        ],200);
    }

    /**
     * Logging out user
     */
    public function delete()
    {
        // revoke the token
        Auth::user()->tokens()->delete();

        return response()->json([
            'message' => 'Logged out',
        ],200);

    }
   
}
