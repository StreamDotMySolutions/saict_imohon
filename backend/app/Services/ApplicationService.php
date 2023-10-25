<?php
namespace App\Services;

use App\Models\User;
use App\Models\Application;
use Illuminate\Http\Request;

class ApplicationService
{

    public static function index()
    { 

        $user =  auth('sanctum')->user();
        $userDepartmentId = $user->userProfile->userDepartment->id; 

        $paginate = Application::whereHas('user.userProfile', function ($query) use ($userDepartmentId) {
                        $query->where('user_department_id', $userDepartmentId);
                    });
        return $paginate->orderBy('id','DESC')->paginate(15)->withQueryString();

    }

    public static function show($application)
    {
        return Application::where('id', $application->id)->first();
    }

    public static function store($request)
    {
        //\Log::info($request);
        $user =  auth('sanctum')->user();
        return Application::create([
            'user_id' => $user->id,
            'description' => $request->input('description')
        ]);
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
}