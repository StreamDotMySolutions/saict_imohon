<?php

namespace App\Http\Controllers\Global;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Services\AccountService;
use App\Http\Requests\Account\UpdateAccountRequest;

class AccountController extends Controller
{
    public function show()
    {
        $account = AccountService::show();

        return response()->json(['account' => $account]);
    }

    public function update(UpdateAccountRequest $request)
    {
   
        AccountService::update($request);

        return response()->json(['message' => "User successfull updated"]);
    }
}
