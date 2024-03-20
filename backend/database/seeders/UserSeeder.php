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
            'name' => 'System Administrator',
            'nric' => '770309-11-0001',
            'email' => 'system@local',
            'password' => Hash::make('password'),
            'is_approved' => true,
        ]);
        $user->markEmailAsVerified();

        UserProfile::create([
            'occupation' => 'System Administrator',
            'user_id' => $user->id,
            'user_department_id' => $child->id,
        ]);

        $user->assignRole('system');
        unset($user);
        // system ########################################### end

        // admin ########################################### start
        $user = User::create([
            'name' => 'Administrator',
            'nric' => '770309-11-0002',
            'email' => 'admin@local',
            'password' => Hash::make('password'),
            'is_approved' => true,
        ]);
        $user->markEmailAsVerified();

        UserProfile::create([
            'occupation' => 'Administrator',
            'user_id' => $user->id,
            'user_department_id' => $child->id,
    
        ]);

        $user->assignRole('admin');
        unset($user);
        // admin ########################################### end


        // user ########################################### start
        $user = User::create([
            'name' => 'User',
            'nric' => '770309-11-0003',
            'email' => 'user@local',
            'password' => Hash::make('password'),
            'is_approved' => true,
        ]);
        $user->markEmailAsVerified();

        UserProfile::create([
            'user_id' => $user->id,
            'user_department_id' => $child->id,
            'occupation' => 'Pegawai F41'
        ]);
        $user->assignRole('user');
        unset($user);
        // user ########################################### end

  
        // manager ########################################### start
        $user = User::create([
            'name' => 'Manager',
            'nric' => '770309-11-0004',
            'email' => 'manager@local',
            'password' => Hash::make('password'),
            'is_approved' => true,
        ]);
        $user->markEmailAsVerified();

        UserProfile::create([
            'user_id' => $user->id,
            'user_department_id' => $child->id,
            'occupation' => 'Region Manager'
        ]);
        $user->assignRole('manager');
        unset($user);
        // manager ########################################### manager


        // boss ########################################### start
        $user = User::create([
            'name' => 'Boss',
            'nric' => '770309-11-0006',
            'email' => 'boss@local',
            'password' => Hash::make('password'),
            'is_approved' => true,
        ]);
        $user->markEmailAsVerified();

        UserProfile::create([
            'user_id' => $user->id,
            'user_department_id' => $child->id,
            'occupation' => 'Boss'
        ]);
        $user->assignRole('boss');
        // boss ########################################### end
    }
}
