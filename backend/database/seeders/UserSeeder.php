<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\UserDepartment;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class UserSeeder extends Seeder
{
    public function run()
    {

        Role::create(['name' => 'system']);
        Role::create(['name' => 'admin']);
        Role::create(['name' => 'user']);
        
        User::truncate();
        $user = User::create([
            'email' => 'system@local',
            'password' => Hash::make('password'),
        ]);

        $user->assignRole('system');

        // root
        $parent = UserDepartment::create([
            'name' => 'angkasapuri',
        ]);

        //child
        $child = UserDepartment::create([
            'name' => 'unit grafik',
        ]);

        // build
        $node = UserDepartment::find($parent->id); // find the node
        $node->appendNode($child); // assign created department to t
    }
}
