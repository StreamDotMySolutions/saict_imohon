<?php
namespace App\Services;

use App\Models\User;
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
        
        // user
        $user = User::create($request->only(['email','password']));
    
        // role
        $user->assignRole($request->input('role'));

        
    }
}
