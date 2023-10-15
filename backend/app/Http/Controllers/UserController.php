<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserService;
use App\Http\Requests\StoreUserRequest;

class UserController extends Controller
{
    public function store(StoreUserRequest $request)
    {
        \Log::info($request->validated());
        //UserService::store($request->validated());
        return response()->json(['message' => 'success']);
    }

}
