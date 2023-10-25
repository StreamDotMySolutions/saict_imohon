<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\UserProfile;
use App\Models\UserDepartment;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Roles
        Role::create(['name' => 'system']);
        Role::create(['name' => 'admin']);
        Role::create(['name' => 'user']);
        Role::create(['name' => 'manager']);
        Role::create(['name' => 'boss']);
        
        // Departments
        // root
        $parent = UserDepartment::create([
            'name' => 'ANGKASAPURI',
        ]);

        //child
        $child = UserDepartment::create([
            'name' => 'SEKSYEN APLIKASI DAN ICT',
        ]);

        // build
        $node = UserDepartment::find($parent->id); // find the node
        $node->appendNode($child); // assign created department to t

        // system ########################################### start
        User::truncate();
        $user = User::create([
            'email' => 'system@local',
            'password' => Hash::make('password'),
            'is_approved' => true,
        ]);

        UserProfile::create([
            'user_id' => $user->id,
            'user_department_id' => $child->id,
            'name' => 'System Administrator'
        ]);

        $user->assignRole('system');
        unset($user);
        // system ########################################### end

        // admin ########################################### start
        $user = User::create([
            'email' => 'admin@local',
            'password' => Hash::make('password'),
            'is_approved' => true,
        ]);

        UserProfile::create([
            'user_id' => $user->id,
            'user_department_id' => $child->id,
            'name' => 'Administrator'
        ]);

        $user->assignRole('admin');
        unset($user);
        // admin ########################################### end


        // user ########################################### start
        $user = User::create([
            'email' => 'user@local',
            'password' => Hash::make('password'),
            'is_approved' => true,
        ]);

        UserProfile::create([
            'user_id' => $user->id,
            'user_department_id' => $child->id,
            'name' => 'User'
        ]);
        $user->assignRole('user');
        unset($user);
        // user ########################################### end

  
        // manager ########################################### start
        $user = User::create([
            'email' => 'manager@local',
            'password' => Hash::make('password'),
            'is_approved' => true,
        ]);

        UserProfile::create([
            'user_id' => $user->id,
            'user_department_id' => $child->id,
            'name' => 'Manager'
        ]);
        $user->assignRole('manager');
        unset($user);
        // manager ########################################### manager


        // boss ########################################### start
        $user = User::create([
            'email' => 'boss@local',
            'password' => Hash::make('password'),
            'is_approved' => true,
        ]);

        UserProfile::create([
            'user_id' => $user->id,
            'user_department_id' => $child->id,
            'name' => 'Pelulus 2'
        ]);
        $user->assignRole('boss');
        // boss ########################################### end
    }
}
