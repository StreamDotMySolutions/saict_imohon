<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StatisticsController extends Controller
{
    public function UserDashboard()
    {
        $user =  auth('sanctum')->user();
        $userDepartmentId = $user->userProfile->userDepartment->id; 
        $pc = Application::query()
                ->with(['user.userProfile','applicationItem'])
                ->whereHas('user.userProfile', function ($query) use ($userDepartmentId) {
                    $query->where('user_department_id', $userDepartmentId);
                })
                ->count('pc_requested');
    }
}
