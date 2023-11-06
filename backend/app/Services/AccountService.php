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

    public static function update($request)
    {
        \Log::info($request);
        
        $user = User::where('id', auth('sanctum')->user()->id)->first();
        
        if($request->has('email')){
            $user->update($request->only('email'));
        }

        if($request->has('password')){
            $user->update([ 'password' => Hash::make($request->input('password')) ] );
        }

        if($request->has('name')){
            $user->update($request->only('name'));
            //$user->profile->update($request->only('name'));
        }

        if($request->has('occupation')){
            $user->profile->update($request->only('occupation'));
        }

        if($request->has('nric')){
            $user->update($request->only('nric'));
            //$user->profile->update($request->only('nric'));
        }

        if($request->has('phone')){
            $user->profile->update($request->only('phone'));
        }

        if($request->has('address')){
            $user->profile->update($request->only('address'));
        }

        if($request->has('user_department_id')){
            $user->profile->update($request->only('user_department_id'));
        }
    }


}