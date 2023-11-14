<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application;

class StatisticsController extends Controller
{
    public function requested($item)
    {

        $user =  auth('sanctum')->user();
        $userDepartmentId = $user->userProfile->userDepartment->id; 
        $applications = Application::query()         
                            ->with([
                                'user.userProfile', 
                                'applicationItem'
                                ])
                            ->whereHas('user.userProfile', function ($query) use ($userDepartmentId) {
                                $query->where('user_department_id', $userDepartmentId);
                            })
                            ->get();

                $pc = $applications->sum(function ($application) {
                    return $application->applicationItem->pc_requested;
                });

                $nb = $applications->sum(function ($application) {
                    return $application->applicationItem->nb_requested;
                });

                $pbwn = $applications->sum(function ($application) {
                    return $application->applicationItem->pbwn_requested;
                });

                $pcn = $applications->sum(function ($application) {
                    return $application->applicationItem->pcn_requested;
                });

                $projektor = $applications->sum(function ($application) {
                    return $application->applicationItem->projektor_requested;
                });

                $webcam = $applications->sum(function ($application) {
                    return $application->applicationItem->webcam_requested;
                });

        return response()->json([
            'pc' => $pc,
            'nb' => $nb,
            'pbwn' => $pbwn,
            'pcn' => $pcn,
            'projektor' => $projektor,
            'webcam' => $webcam,
        ]);
    }
}
