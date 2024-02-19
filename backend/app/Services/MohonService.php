<?php
namespace App\Services;

use App\Models\MohonRequest;
use App\Models\MohonApproval;
use Illuminate\Http\Request;

class MohonService
{

    public static function index()
    {
        $user =  auth('sanctum')->user(); // user auth
        $role = $user->roles->pluck('name')[0]; // User only have 1 role
   
        switch($role){
            case 'user':
            case 'manager':
                $mohons = self::getMohonDataAsUser($user);
            break;
            default:
                $mohons = [];
            break;
        }

        return $mohons;
    }

    public static function getMohonDataAsUser($user)
    {

        # User hasOne UserProfile
        # UserProfile belongsTo UserDepartment
        $userDepartmentId = $user->userProfile->userDepartment->id; // User Department ID

        $paginate = MohonRequest::query(); // Intiate Paginate
        $mohons = $paginate->orderBy('id','DESC')
                    //->with(['mohonApproval'])
                    ->with(['user.userProfile','mohonApproval'])

                    // to list requests from same department
                    // based on User Department ID
                    ->whereHas('user.userProfile', function ($query) use ($userDepartmentId) {
                        $query->where('user_department_id', $userDepartmentId);
                    })

                    ->withCount(['mohonItems']) // to calculate how many items
                    
                    ->paginate(10) // 10 items per page
                    ->withQueryString(); // with GET Query String
                               
    
        return $mohons;
    }

    public static function store($request)
    {
        //\Log::info($request);
        $user =  auth('sanctum')->user();
        $mohonRequest = MohonRequest::create([
            'user_id' => $user->id,
            'title' => $request->input('title'),
            'description' => $request->input('description')
        ]);

        // create MohonApproval
        $mohonApproval = MohonApproval::create([
            'mohon_request_id' => $mohonRequest->id,
            'user_id' => $user->id,
            'step' => 0,
            'status' => 'pending',
        ]);

    
        
    }

    public static function show($id)
    {
        $request = MohonRequest::query()
                    ->where('id', $id)
                    ->with(['mohonApproval'])
                    //->with(['application.user.userProfile.userDepartment'])
                    ->first();
        return $request;
    }

    public static function update($request, $id)
    {
        $user =  auth('sanctum')->user();
        return MohonRequest::query()
                            ->where('user_id', $user->id)
                            ->where('id',$id)
                            ->update([
                                'title'  => $request->input('title'),
                                'description'  => $request->input('description'),
                                ]);
    }

    public static function delete($id)
    {
        $user =  auth('sanctum')->user();
        return MohonRequest::query()
                            ->where('user_id', $user->id)
                            ->where('id',$id)
                            ->delete();
    }
}