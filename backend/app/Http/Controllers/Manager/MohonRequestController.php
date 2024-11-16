<?php
namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\MohonService;
use App\Models\MohonRequest;


class MohonRequestController extends Controller
{

    public function index(Request $request)
    {
        
        $status = $request->query('status');
    
        switch($request->query('status')){
            case 'pending': $mohons = $this->pending(); break;
            case 'approved': $mohons = $this->approved(); break;
            case 'rejected': $mohons = $this->rejected(); break;
        }
                            

        return response()->json([
            'mohons' => $mohons
        ]);
    }

    public function show(MohonRequest $mohonRequest)
    {
        $mohon = MohonService::show($id);
        return response()->json([
            'mohon' => $mohon
        ]);
    }

    private function pending()
    {
        # User hasOne UserProfile
        $user =  auth('sanctum')->user(); // get loggedIn user
        # UserProfile belongsTo UserDepartment
        $userDepartmentId = $user->userProfile->userDepartment->id; // User Department ID

        $paginate = MohonRequest::query(); // Intiate Paginate
        $mohons = $paginate->orderBy('id','DESC')
                    //->with(['mohonApproval'])
                    ->with(['user.userProfile.userDepartment','mohonApproval'])

                    // only list where step = 1
                    ->whereHas('mohonApproval', function ($query) use ($user) {
                        $query->where('status', 'pending' )
                              ->where('manager_id', $user->id) // from user that request Mohon
                              ->where('step',1);
                    })

                    ->whereDoesntHave('mohonApproval', function ($query) {
                        $query->where('step', [2,3,4]);
                    })

                    ->whereHas('user.userProfile', function ($query) use ($userDepartmentId) {
                        $query->where('user_department_id', $userDepartmentId);
                    })

                    ->withCount([
                        'mohonItems', // Mohon hasMany MohonItems
                        ]) // to calculate how many items
                    
                    ->paginate(10) // 10 items per page
                    ->withQueryString(); // with GET Query String


        // Calculate the starting number based on the current page
        $startNumber = ($mohons->currentPage() - 1) * $mohons->perPage() + 1;

        // Add the numbering field to each item
        $mohons->getCollection()->transform(function ($item, $index) use ($startNumber) {
            $item->numbering = $startNumber + $index;
            return $item;
        });  

        return $mohons;
    }

    private function approved()
    {
        # User hasOne UserProfile
        $user =  auth('sanctum')->user(); // get loggedIn user
        # UserProfile belongsTo UserDepartment
        $userDepartmentId = $user->userProfile->userDepartment->id; // User Department ID

        $paginate = MohonRequest::query(); // Intiate Paginate
        $mohons = $paginate->orderBy('id','DESC')
                    //->with(['mohonApproval'])
                    ->with(['user.userProfile.userDepartment','mohonApproval'])

                    // only list where step = 3 status = pending ( already sent to admin )
                    ->whereHas('mohonApproval', function ($query) use ($user) {
                        $query->where('status', 'pending' )
                              ->where('manager_id', $user->id) // from user that request Mohon
                              ->where('step',3);
                    })

                    ->whereDoesntHave('mohonApproval', function ($query) {
                        $query->where('step', [4]);
                    })

                    ->whereHas('user.userProfile', function ($query) use ($userDepartmentId) {
                        $query->where('user_department_id', $userDepartmentId);
                    })

                    ->withCount([
                        'mohonItems', // Mohon hasMany MohonItems
                        ]) // to calculate how many items
                    
                    ->paginate(10) // 10 items per page
                    ->withQueryString(); // with GET Query String


        // Calculate the starting number based on the current page
        $startNumber = ($mohons->currentPage() - 1) * $mohons->perPage() + 1;

        // Add the numbering field to each item
        $mohons->getCollection()->transform(function ($item, $index) use ($startNumber) {
            $item->numbering = $startNumber + $index;
            return $item;
        });  

        return $mohons;
    }

    private function rejected()
    {
        # User hasOne UserProfile
        $user =  auth('sanctum')->user(); // get loggedIn user
        # UserProfile belongsTo UserDepartment
        $userDepartmentId = $user->userProfile->userDepartment->id; // User Department ID

        $paginate = MohonRequest::query(); // Intiate Paginate
        $mohons = $paginate->orderBy('id','DESC')
                    //->with(['mohonApproval'])
                    ->with(['user.userProfile.userDepartment','mohonApproval'])

                    // only list where step = 3
                    ->whereHas('mohonApproval', function ($query) use ($user) {
                        $query->where('status', 'rejected' )
                              ->where('manager_id', $user->id) // from user that request Mohon
                              ->where('step',2);
                    })

                    ->whereDoesntHave('mohonApproval', function ($query) {
                        $query->where('step', [3,4]);
                    })

                    ->whereHas('user.userProfile', function ($query) use ($userDepartmentId) {
                        $query->where('user_department_id', $userDepartmentId);
                    })

                    ->withCount([
                        'mohonItems', // Mohon hasMany MohonItems
                        ]) // to calculate how many items
                    
                    ->paginate(10) // 10 items per page
                    ->withQueryString(); // with GET Query String


        // Calculate the starting number based on the current page
        $startNumber = ($mohons->currentPage() - 1) * $mohons->perPage() + 1;

        // Add the numbering field to each item
        $mohons->getCollection()->transform(function ($item, $index) use ($startNumber) {
            $item->numbering = $startNumber + $index;
            return $item;
        });  

        return $mohons;
    }

   
}