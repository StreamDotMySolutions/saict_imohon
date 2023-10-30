<?php
namespace App\Services;

use App\Models\User;
use App\Models\Application;
use App\Models\ApplicationApproval;
use App\Models\ApplicationLog;
use App\Models\ApplicationItem;
use Illuminate\Http\Request;

class ApplicationService
{

    public static function index($request)
    { 
        $status = $request->query('status'); // [ pending , approved , rejected ]
        $user =  auth('sanctum')->user(); // user auth
        $role = $user->roles->pluck('name')[0]; // User only have 1 role

        switch($role){

            case 'user':
            case 'manager':

                // user and manager only see data from dept only
                // only view step = 1
                $userDepartmentId = $user->userProfile->userDepartment->id; 
                $paginate = Application::query()
                                        ->with(['user.userProfile','applicationApproval','applicationItem'])
                                        ->whereHas('user.userProfile', function ($query) use ($userDepartmentId) {
                                            $query->where('user_department_id', $userDepartmentId);
                                        });

            break;

            case 'admin':
                // admin can view all data
                // where apps approved by manager
                // coming from step=1 ( dictated by applicationApprovalByManager )
                $paginate = Application::query()
                            ->with(['user.userProfile.userDepartment','applicationItem'])
                            ->whereHas('applicationApprovalByAdmin', function ($query) use ($status) {
                                $query->where('status','=', $status);
                            });

    
            break;
            
            case 'boss':
            break;
        }

        return $paginate->orderBy('id','DESC')->paginate(15)->withQueryString();

    }

    public static function show($application)
    {
        return Application::query()
                                ->with('user.UserProfile')
                                ->with('applicationItem')
                                ->with('applicationApproval')

                                ->where('id', $application->id)->first();
    }

    public static function store($request)
    {
        //\Log::info($request);
        $user =  auth('sanctum')->user();
        return Application::create([
            'user_id' => $user->id,
            'type' => $request->input('type'),
            'description' => $request->input('description')
        ]);
    }

    public static function storeItems($application, $request)
    {
        \Log::info($request);
        // update ApplicationApproval
        $matchThese = [
            'application_id' => $application->id,
        ];
        
        $data = $request->except(['user_id', 'description', 'application_id']);
        
       return  ApplicationItem::updateOrCreate($matchThese, $data);
    }

    public static function update($application,$request)
    {
        $user =  auth('sanctum')->user();
        return Application::query()
                            ->where('user_id', $user->id)
                            ->where('id',$application->id)
                            ->update([
                                    'user_id' => $user->id,
                                    'description'=> $request->input('description')
                                ]);
    }

    public static function delete($application){
        $user =  auth('sanctum')->user();
        return $application->where('user_id', $user->id)->where('id',$application->id)->delete();
    }

    public static function setApplicationApprovalStatus($application,$status,$step)
    {
        $user =  auth('sanctum')->user();

        // update ApplicationApproval
        $matchThese = [
                        'application_id' => $application->id,
                    ];
        return ApplicationApproval::updateOrCreate($matchThese,
                                                    [
                                                        'step' => $step, // 1 is manager
                                                        'user_id' => $user->id,
                                                        'status' => $status
                                                    ]);
    }

    public static function setApplicationLog($application,$body)
    {
        $user =  auth('sanctum')->user();
        $application = Application::where('id',$application->id)->first();

        ApplicationLog::create([
            'user_id' => $user->id,
            'application_id' => $application->id,
            'status' => $application->getStatus(),
            'step' => $application->getStep(),
            'body' => $body
        ]);
    }

}