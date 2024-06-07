<?php
namespace App\Services;

use App\Models\MohonRequest;
use App\Models\MohonApproval;
use Illuminate\Http\Request;

class MohonService
{

    public static function index($status)
    {
        $user =  auth('sanctum')->user(); // user auth
        $role = $user->roles->pluck('name')[0]; // User only have 1 role
        //\Log::info($status);

   
        switch($role){
            case 'user':
                $mohons = self::getMohonDataAsUser($user);
            break;
            case 'manager':
                $mohons = self::getMohonDataAsManager($user, $status);
               
            break;

            case 'admin':
                $mohons = self::getMohonDataAsAdmin();
            break;

            case 'boss':
                $mohons = self::getMohonDataAsBoss();
            break;

            default:
                $mohons = [];
            break;
        }

        return $mohons;
    }

    /*
    * List All MohonRequest
    */
    public static function getMohonDataAsUser($user)
    {

        # User hasOne UserProfile
        # UserProfile belongsTo UserDepartment
        $userDepartmentId = $user->userProfile->userDepartment->id; // User Department ID

        $paginate = MohonRequest::query(); // Intiate Paginate
        $mohons = $paginate->orderBy('id','DESC')
                    //->with(['mohonApproval'])
                    ->with([
                        'user.userProfile',
                        'mohonApproval'
                        ])

                    // to list requests from same department
                    // based on User Department ID
                    ->whereHas('user.userProfile', function ($query) use ($userDepartmentId) {
                        $query->where('user_department_id', $userDepartmentId);
                    })

                    ->withCount([
                        'mohonItems', // Mohon hasMany MohonItems
                        'mohonDistributionItems' // Mohon hasMany MohonDistributionItems
                        
                        ]) // to calculate how many items
                    
                    ->paginate(10) // 10 items per page
                    ->withQueryString(); // with GET Query String
                               
    
        return $mohons;
    }

    /*
    * Only list MohonRequest Step = 1
    */
    public static function getMohonDataAsManager($user, $status)
    {

        \Log::info($status);

        # User hasOne UserProfile
        $user =  auth('sanctum')->user(); // get loggedIn user

        # UserProfile belongsTo UserDepartment
        $userDepartmentId = $user->userProfile->userDepartment->id; // User Department ID

        $paginate = MohonRequest::query(); // Intiate Paginate
        $mohons = $paginate->orderBy('id','DESC')
                    //->with(['mohonApproval'])
                    ->with(['user.userProfile','mohonApproval'])

                    
                    // MohonApproval 
                    ->whereHas('mohonApproval', function ($query) use ($user,$status) {

                        switch($status){
                            case 'pending':
                                // only list where step = 1
                                $query->where('step', 1)
                                        ->where('status', $status)
                                        ->where('manager_id', $user->id); // from user that request Mohon
                            break;

                            case 'approved':
                                // only list where step = 2
                               
                                $query->where('step', 2)
                                        ->where('status', $status)
                                        ->where('user_id', $user->id); // from pelulus1 that approved
                            break;

                            case 'rejected':
                                // only list where step = 2
                                $query->where('step', 2)
                                        ->where('status', $status)
                                        ->where('user_id', $user->id); // from pelulus1 that approve
                            break;
                        }
            

                    })

                    // to list requests from same department
                    // based on User Department ID
                    ->whereHas('user.userProfile', function ($query) use ($userDepartmentId) {
                        $query->where('user_department_id', $userDepartmentId);
                    })

                    ->withCount(['mohonItems']) // to calculate how many items
                    
                    ->paginate(10) // 10 items per page
                    ->withQueryString(); // with GET Query String

                    //\Log::info('execute here approved : ' .  $status);
                    //\Log::info($mohons);
        return $mohons;
    }

    /*
    * Only list MohonRequest Step = 2 && status == 'approved'
    */
    public static function getMohonDataAsAdmin()
    {

        $paginate = MohonRequest::query(); // Intiate Paginate
        $mohons = $paginate->orderBy('id','DESC')
                    //->with(['mohonApproval'])
                    ->with(['user.userProfile.userDepartment','mohonApproval'])

                    // only list where step = 1
                    ->whereHas('mohonApproval', function ($query) {
                        $query->where('status', 'approved')->where('step', 2);
                    })

                    ->withCount(['mohonItems']) // to calculate how many items
                    
                    ->paginate(10) // 10 items per page
                    ->withQueryString(); // with GET Query String
                               
    
        return $mohons;
    }

    /*
    * Only list MohonRequest Step = 3 && status == 'approved'
    */
    public static function getMohonDataAsBoss()
    {
        //\Log::info('boss index');

        $paginate = MohonRequest::query(); // Intiate Paginate
        $mohons = $paginate->orderBy('id','DESC')
                    //->with(['mohonApproval'])
                    ->with(['user.userProfile','mohonApproval'])

                    // only list where step = 1
                    ->whereHas('mohonApproval', function ($query) {
                        $query->where('status', 'approved')->where('step', 3);
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
            // 'title' => $request->input('title'),
            // 'description' => $request->input('description')
             'title' => 'Permohonan',
             'description' => 'Maklumat permohonan'
            
        ]);

        // create MohonApproval
        $mohonApproval = MohonApproval::create([
            'mohon_request_id' => $mohonRequest->id,
            'user_id' => $user->id,
            'step' => 0,
            'status' => 'pending',
        ]);

        if($mohonRequest && $mohonApproval){
            return $mohonRequest;
        }
    }

    public static function show($id)
    {
        $request = MohonRequest::query()
                    ->where('id', $id)
                    ->with([
                        'mohonApprovals.user.userProfile',
                        'mohonApproval.user.userProfile',
                        //'mohonDistributionRequests',
                        'mohonDistributionRequests' => function ($query) {
                            $query->withCount('mohonDistributionItems');
                            $query->with([
                                'mohonDistributionApprovals', // latest approval status
                                'user.userProfile',
                                'mohonDistributionItems.category',
                                'mohonDistributionItems.inventory',
                                'mohonDistributionItems.mohonItem'
                            ]);
                            
                        },
                        'mohonItems.category',
                        'user.userProfile.userDepartment'
                        ])
                    ->withCount(['mohonItems'])
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
        $mohonRequest = MohonRequest::query()
                            ->where('user_id', $user->id)
                            ->where('id',$id)
                            ->firstOrFail();

        // Delete MohonItems
        $mohonRequest->mohonItems()->delete();

        // Delete MohonRequest
        return $mohonRequest->delete();

    }
}