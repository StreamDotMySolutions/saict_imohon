<?php
namespace App\Services;

use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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
        if ($request->has('password')) {
            // If a password is provided, create a user with the provided password.
            $user = User::create([
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
            ]);
        } else {
            // If no password is provided, create a user with a random password.
            //$randomPassword = Str::random(10); // Generate a random password
            $user = User::create([
                'email' => $request->input('email'),
                'password' => Hash::make('password'),
            ]);
        }
        
        // Role
        $user->assignRole($request->input('role'));

        // insert into UserProfile
        $profile = $request->merge(['user_id' => $user->id]);
        UserProfile::create($profile->except(['email','password']));
    }

    public static function update(Request $request, $user){
        
        // User
        if ($request->has('password')) {
            // If a password is provided, create a user with the provided password.
            $password = Hash::make($request->input('password'));
            User::where('id', $user->id)->update(['password' => $password]);
        } 

        // Role
        if ($request->has('role')) {
            // if change role
            $user->syncRoles($request->input('role'));
        }

        // Email
        if ($request->has('email')) {
            // if change role
             User::where('id', $user->id)->update($request->only(['email']));
        }

        // User Profile
        return UserProfile::where('user_id', $user->id)->update($request->except(['email', 'password','_method','role','user_id']));

    }

    public static function show($user){
        // User, Profile
        $user = User::where('id',$user->id)->with(['profile.userDepartment'])->first();

        // Role

        //\Log::info($user);
        $user['role'] = $user->roles->pluck('name')[0];

        return $user;
    }

    public static function index()
    {
        $paginate = User::query()->with('profile.userDepartment')->where('id','<>',1);
        $users = $paginate->orderBy('id','DESC')->paginate(25)->withQueryString();
        return $users;
    }
}
