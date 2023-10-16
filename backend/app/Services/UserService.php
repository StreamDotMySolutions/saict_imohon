<?php
namespace App\Services;

use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Http\Request;

class UserService
{
    // 'role' => 'admin',
    // 'email' => 'user@local',
    // 'password' => 'password',
    // 'name' => 'xxx',
    // 'occupation' => 'xxx',
    // 'nric' => '800125-12-1233',
    // 'phone' => 'xxx',
    // 'address' => 'xxx',
    // 'user_department_id' => '4',
    public static function store(Request $request){
        
        // User
        $user = User::create($request->only(['email','password']));
    
        // Role
        $user->assignRole($request->input('role'));

        // insert into UserProfile
        $profile = $request->merge(['user_id' => $user->id]);
        \Log::info($profile);
        UserProfile::create($profile->except(['email','password']));
    }
}
