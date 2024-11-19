<?php

namespace App\Http\Controllers\Global;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserDepartment;

class UserDepartmentController extends Controller
{
    public function index(){

        $userDepartments = UserDepartment::defaultOrder()->get()->toTree();

        return response()->json([
            'user_departments' => $userDepartments
        ]);
    }
}

