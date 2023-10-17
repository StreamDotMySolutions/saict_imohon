<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserService;
use App\Http\Requests\StoreUserRequest;
use App\Models\User;

class UserController extends Controller
{

    public function index()
    {
        $paginate = User::query()->with('profile.userDepartment')->where('id','<>',1);
        $users = $paginate->orderBy('id','DESC')->paginate(25)->withQueryString();

        return response()->json(['users' => $users]);
    }

    public function store(StoreUserRequest $request)
    {
        \Log::info($request->validated());
        UserService::store($request);
        return response()->json(['message' => 'success']);
    }

    public function show(User $user)
    {
        // User, Profile
        $user = User::where('id',$user->id)->with(['profile.userDepartment'])->first();

        // Role

        \Log::info($user);
        $user['role'] = $user->roles->pluck('name')[0];
        return response()->json(['user' => $user]);
    }

}
