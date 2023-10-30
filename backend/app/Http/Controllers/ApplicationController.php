<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ApplicationService;
use App\Http\Requests\StoreApplicationRequest;
use App\Http\Requests\UpdateApplicationRequest;
use App\Http\Requests\ApprovalByManagerRequest;
use App\Http\Requests\ApprovalByAdminRequest;
use App\Models\Application;

class ApplicationController extends Controller
{
    public function index(){
        $applications = ApplicationService::index();
        return response()->json([
            'applications' => $applications
        ]);
    }

    public function show(Application $application){
        //\Log::info($application);
        $application = ApplicationService::show( $application);
        return response()->json([
            'application' => $application
        ]);
    }

    public function store(StoreApplicationRequest $request){
        //\Log::info($request);
        $application = ApplicationService::store($request);
        $items = ApplicationService::storeItems($application, $request);
        $status = ApplicationService::setApplicationApprovalStatus($application,'pending', $step=1);
        $log = ApplicationService::setApplicationLog($application,'create');

        return response()->json([
            'message' => 'Application successfully processed',
            'id' => $application->id
        ]);
    } 

    public function update(Application $application,UpdateApplicationRequest $request){

        if(!$application->editable){
            $log = ApplicationService::setApplicationLog($application,'attempt to update protected application');
            return response()->json([
                'message' => "Kemaskini tidak dibenarkan",
                'id' => $application->id
            ]);
        }

        ApplicationService::update($application,$request);
        $items = ApplicationService::storeItems($application, $request);
        $log = ApplicationService::setApplicationLog($application,'update');
        return response()->json([
            'message' => "Permohonan  telah dikemaskini.",
            'id' => $application->id
        ]);
    }

    public function delete(Application $application){

        if(!$application->deleteable){
            $log = ApplicationService::setApplicationLog($application,'attempt to delete protected application');
            return response()->json([
                'message' => "Padam tidak dibenarkan",
                'id' => $application->id
            ]);
        }
     
        $log = ApplicationService::setApplicationLog($application,'delete');
        ApplicationService::delete($application);

        return response()->json([
            'message' => "Permohonan id={$application->id} telah dihapus.",
            //'id' => $application->id
        ]);
    }

    public function approvalByManager(ApprovalByManagerRequest $request,Application $application,$status)
    {
        // \Log::info($application);
        // \Log::info($status);
        switch($status){
            case 'approved':
                ApplicationService::setApplicationApprovalStatus($application,'approved',$step=1);
                ApplicationService::setApplicationApprovalStatus($application,'pending', $step=2);
            break;

            case 'rejected':
                ApplicationService::setApplicationApprovalStatus($application,'rejected',$step=1);
            break;
        }
        
        $log = ApplicationService::setApplicationLog($application,$status);

        return response()->json([
            'message' => "Permohonan ID={$application->id} telah diproses.",
            'id' => $application->id
        ]);
    }

    public function approvalByAdmin(ApprovalByAdminRequest $request, Application $application,$status)
    {
        // \Log::info($application);
        // \Log::info($status);
        switch($status){
            case 'approved':
                ApplicationService::setApplicationApprovalStatus($application,'approved',$step=2);
                
            break;

            case 'rejected':
                ApplicationService::setApplicationApprovalStatus($application,'rejected',$step=2);
            break;
        }
        
        $log = ApplicationService::setApplicationLog($application,$status);

        return response()->json([
            'message' => "Permohonan ID={$application->id} telah diproses.",
            'id' => $application->id
        ]);
    }
}
