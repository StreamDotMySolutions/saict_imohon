<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Services\AccountService;
use App\Http\Requests\UpdateAccountRequest;

class AccountController extends Controller
{
    public function show()
    {
        $account = AccountService::show();

        return response()->json(['account' => $account]);
    }

    public function update(UpdateAccountRequest $request)
    {
        \Log::info($request);
        $user =  auth('sanctum')->user();
        //AccountService::update($user->id,$request->validated);

        return response()->json(['message' => "{$user->profile->name} successfull updated"]);
    }
}
