<?php
namespace App\Services;

use App\Models\User;

class UserService
{
    public static function store($userData){
        $user = User::create($userData);
        return $user;
    }
}
