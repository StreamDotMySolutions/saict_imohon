<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\UserProfile;
use App\Models\UserDepartment;
use App\Models\Category;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Create ITEMS for Category
        $categoryParent = Category::create([
            'name' => 'ITEMS',
        ]);

        $categoryChild1 = Category::create([
            'name' => 'PC',
        ]);
        $categoryChild2 = Category::create([
            'name' => 'PRINTER',
        ]);

        $categoryNode = Category::find($categoryParent->id); // find the node
        $categoryNode->appendNode($categoryChild1); // assign created department to t
        $categoryNode->appendNode($categoryChild2); // assign created department to t

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
            'nric' => '770309110001',
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
            'nric' => '770309110002',
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
            'nric' => '770309110003',
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
            'nric' => '770309110004',
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
            'nric' => '770309110006',
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
