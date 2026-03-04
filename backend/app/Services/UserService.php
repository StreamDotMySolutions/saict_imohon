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
                'name' => $request->input('name'),
                'nric' => $request->input('nric'),
                'is_approved' => true,
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
            ]);
        } else {
            // If no password is provided, create a user with a random password.
            //$randomPassword = Str::random(10); // Generate a random password
            $user = User::create([
                'name' => $request->input('name'),
                'nric' => $request->input('nric'),
                'is_approved' => true,
                'email' => $request->input('email'),
                'password' => Hash::make('password'),
            ]);
        }
        // force verified
        $user->markEmailAsVerified();
        
        // Role
        $user->assignRole($request->input('role'));

        // insert into UserProfile
        $profile = $request->merge(['user_id' => $user->id]);
        return UserProfile::create($profile->except(['email','password','name','nric']));
    }

    public static function approve($user)
    {
        return User::where('id', $user->id)->update(['is_approved' => true]);
    }

    public static function disable($user)
    {
        return User::where('id', $user->id)->update(['is_approved' => false]);
    }

    public static function update(Request $request, $user){

        //\Log::info($request);
        
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

        // Name
        if ($request->has('name')) {
            // if change role
                User::where('id', $user->id)->update($request->only(['name']));
        }

        // NRIC
        if ($request->has('nric')) {
            // if change role
                User::where('id', $user->id)->update($request->only(['nric']));
        }

        // IS APPROVED
        if ($request->has('is_approved')) {
            // if change role
                User::where('id', $user->id)->update($request->only(['is_approved']));
        }
        

        // User Profile
        return UserProfile::where('user_id', $user->id)->update($request->except(['is_approved','email', 'name','nric','password','_method','role','user_id']));

    }

    public static function show($user){
        // User, Profile
        $user = User::where('id',$user->id)->with(['profile.userDepartment'])->first();

        // Role

        //\Log::info($user);
        $user['role'] = $user->roles->pluck('name')[0];

        return $user;
    }

    public static function index(Request $request)
    {
        $users = [];
        $search = $request->input('search');
        $deptId = $request->input('user_department_id');

        if ($request->has('role')) {
            $role = $request->query('role');
            $query = User::query()
                ->with('profile.userDepartment')
                ->with('roles')
                ->whereHas('roles', fn($q) => $q->whereIn('name', [$role]))
                ->where('is_approved', true);

            if ($search) {
                $query->where(fn($q) => $q->where('name', 'like', "%{$search}%")
                                          ->orWhere('email', 'like', "%{$search}%"));
            }
            if ($deptId) {
                $query->whereHas('profile', fn($q) => $q->where('user_department_id', $deptId));
            }

            $users = $query->orderBy('id', 'DESC')->paginate(20)->withQueryString();
        }

        if ($request->has('is_approved')) {
            $query = User::query()
                ->with('profile.userDepartment')
                ->with('roles')
                ->where('is_approved', $request->input('is_approved'));

            if ($search) {
                $query->where(fn($q) => $q->where('name', 'like', "%{$search}%")
                                          ->orWhere('email', 'like', "%{$search}%"));
            }
            if ($deptId) {
                $query->whereHas('profile', fn($q) => $q->where('user_department_id', $deptId));
            }

            $users = $query->orderBy('id', 'DESC')->paginate(25)->withQueryString();
        }

        return $users;
    }

    public static function delete($user)
    {

        // Delete in User
        if ($user) {

            $profile = $user->profile;

            if ($profile) {
                // If the user has a profile, delete it
                $profile->delete();
            }

            // should delete all related data

            // If the user with the given ID is found, delete it
            $user->delete();
        } 
    }
}
