<?php
namespace App\Services;

use App\Models\User;
use App\Models\Application;
use Illuminate\Http\Request;

class ApplicationService
{

    public static function index(){ 

        $user =  auth('sanctum')->user();
        $userDepartmentId = $user->userProfile->userDepartment->id; 

        $paginate = Application::whereHas('user.userProfile', function ($query) use ($userDepartmentId) {
                        $query->where('user_department_id', $userDepartmentId);
                    });
        return $paginate->orderBy('id','DESC')->paginate(25)->withQueryString();

    }

    public static function show($application){}

    public static function store($request){
        //\Log::info($request);
        $user =  auth('sanctum')->user();
        return Application::create([
            'user_id' => $user->id,
            'description' => $request->input('description')
        ]);
    }

    public static function update($request){}

    public static function delete($application){}
}