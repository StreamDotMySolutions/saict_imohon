<?php
namespace App\Services;

use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AccountService
{
    public static function show()
    {
        // loggedInUser
        $user =  auth('sanctum')->user();

        // User, Profile
        $user = User::where('id',$user->id)->with(['profile.userDepartment'])->first();

        // Role;
        $user['role'] = $user->roles->pluck('name')[0];

        return $user;

    }

    public static function update()
    {

    }


}