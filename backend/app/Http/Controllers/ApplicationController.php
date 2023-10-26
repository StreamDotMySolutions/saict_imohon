<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ApplicationService;
use App\Http\Requests\StoreApplicationRequest;
use App\Http\Requests\UpdateApplicationRequest;
use App\Models\Application;

class ApplicationController extends Controller
{
    public function index(){
        $applications = ApplicationService::index();
        //\Log::info($applications);
        return response()->json([
            'applications' => $applications
        ]);
    }

    public function show(Application $application){
        \Log::info($application);
        $application = ApplicationService::show( $application);
        return response()->json([
            'application' => $application
        ]);
    }

    public function store(StoreApplicationRequest $request){

        $application = ApplicationService::store($request);
        $status = ApplicationService::setApplicationApprovalStatus($application,'pending');

        return response()->json([
            'message' => 'Application successfully processed',
            'id' => $application->id
        ]);
    } 

    public function update(Application $application,UpdateApplicationRequest $request){
        $application = ApplicationService::update($application,$request);
        return response()->json([
            'message' => "Permohonan  telah dikemaskini.",
            //'id' => $application->id
        ]);
    }

    public function delete(Application $application){
        ApplicationService::delete( $application);

        return response()->json([
            'message' => "Permohonan id={$application->id} telah dihapus.",
            //'id' => $application->id
        ]);
    }

    public function approvalByManager(Application $application,$status)
    {
        // \Log::info($application);
        // \Log::info($status);
        $status = ApplicationService::setApplicationApprovalStatus($application,$status);

        return response()->json([
            'message' => $status  ? "Permohonan ID={$application->id} telah diproses." : 'failed',
            'id' => $application->id
        ]);
    }
}