<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::truncate();
        $user = User::create([
            'name' => 'System',
            'email' => 'system@local',
            'password' => Hash::make('password'),
        ]);

        $user->assignRole('system');
    }
}
