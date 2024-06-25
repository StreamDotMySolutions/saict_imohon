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
                        'mohonApproval.user',
                        'approver'
                        ])

                    // list ad LoggedIn User
                    ->where('user_id', $user->id)

                    // to list requests from same department
                    // based on User Department ID
                    // ->whereHas('user.userProfile', function ($query) use ($userDepartmentId) {
                    //     $query->where('user_department_id', $userDepartmentId);
                    // })

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

        //\Log::info($status);

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

                        // $query->whereIn('id', function ($subQuery) {
                        //     $subQuery->select(\DB::raw('MAX(id)'))
                        //         ->from('mohon_approvals')
                        //         ->groupBy('mohon_request_id');
                        // });
                
                
                        switch($status){
                            case 'pending':
                                // only list where step = 1

                                // MAX id
                                $query->whereIn('id', function ($subQuery) {
                                    $subQuery->select(\DB::raw('MAX(id)'))
                                        ->from('mohon_approvals')
                                        ->groupBy('mohon_request_id');
                                        });
                
                             
                                $query->where('step', 1)
                                        ->where('status', 'pending')
                                        ->where('manager_id', $user->id); // from user that request Mohon
                            break;

                            case 'approved':
                                // only list where step = 2
                               //\Log::info($status);
                                $query->where('step',2)
                                        ->where('status', 'approved') // pelulus 1 approved, step upgraded to 3 and status is 'pending'
                                        ->where('manager_id', $user->id); // from pelulus1 that approved
                            break;

                            case 'rejected':
                                // only list where step = 2
                                $query->where('step', 2)
                                        ->where('status', $status)
                                        ->where('manager_id', $user->id); // from pelulus1 that approve
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

                    // only list where step = 3
                    ->whereHas('mohonApproval', function ($query) {
                        $query->where('status', 'pending')->where('step', 3);
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
                    ->with([
                        'user.userProfile',
                        'mohonApproval',
                        'mohonItem'
                        ])

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
            'title' => 'Permohonan Peralatan',
            // 'description' => $request->input('description')
            'step' => 0,
            'status' => 'pending',
            //'description' => 'Maklumat permohonan'
            
        ]);

        

        // create MohonApproval
        $mohonApproval = MohonApproval::create([
            'mohon_request_id' => $mohonRequest->id,
            'user_id' => $user->id, // owner
            'requester_id' => $user->id, // requester
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
                        'mohonApprovalApprovedByUser', // jujst want the message for manager tab
                        'mohonApprovalRejectedByUser', // jujst want the message for manager tab
                        //'mohonDistributionRequests',
                        'mohonDistributionRequests' => function ($query) {
                            $query->withCount('mohonDistributionItems');
                            $query->with([
                                'mohonDistributionApprovals.user',
                                'user.userProfile',
                                'mohonDistributionItems.category',
                                'mohonDistributionItems.inventory',
                                'mohonDistributionItems.mohonItem',
                                'mohonDistributionItems.mohonDistributionItemAcceptance',
                                'mohonDistributionItems.mohonDistributionItemDelivery'
                            ]);
                            
                        },
                        //'mohonItems.category',
                        'mohonItems' => function ($query){
                            $query->with([
                                'category',
                                'mohonDistributionItem',
                                'mohonDistributionItem.mohonDistributionRequest',
                                'mohonDistributionItem.mohonDistributionItemAcceptance',
                                'mohonDistributionItem.mohonDistributionItemDelivery'
                            ]);
                        },
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

        // Delete MohonApprovals
        $mohonRequest->mohonApprovals()->delete();

        // Delete MohonRequest
        return $mohonRequest->delete();

    }
}