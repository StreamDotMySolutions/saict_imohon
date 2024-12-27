<?php
namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Services\MohonApprovalService;
use App\Http\Requests\MohonApproval\UpdateRequest;
use App\Http\Requests\MohonApproval\StoreRequest;

use App\Mail\MohonNotification;
use Illuminate\Support\Facades\Mail;

class MohonApprovalController extends Controller
{

    public function managers()
    {
        $managers = array();
        
        // to list all managers ( that same department with user)
        $user = auth('sanctum')->user();
        $userDepartmentId = $user->userProfile->userDepartment->id; // User Department ID
        
        //\Log::info($userDepartmentId);

        //$managers = \App\Models\User::all();

        // Query users with the same department ID and the role 'manager'
        $managers = User::whereHas('userProfile.userDepartment', function($query) use ($userDepartmentId) {
            $query->where('id', $userDepartmentId);
        })->role('manager')->get();
        
        return response()->json([
            'managers' => $managers,
        ]);
    }

    // User process MohonRequest from step 1 to 2 
    public function store(StoreRequest $request, $mohonRequestId)
    {

        $mohonApprovalService = MohonApprovalService::storeByUser($request, $mohonRequestId);

        // send email to pelulus 1
        $manager_id =  $request->input('manager_id');
        $manager = User::where('id', $manager_id)->first();

        //\Log::info($manager);
        if($manager){
            $data = [
                'name' => $manager->name,
                'message' => 'Notifikasi Permohonan Peralatan'
            ];
            
            Mail::to($manager->email)->send(new MohonNotification($data));
        }
  
        //\Log::info('email done');

        if($mohonApprovalService)
        {
            return response()->json([
                'message' => 'Permohonan ke Pelulus 1 berjaya diterima',
            ]);
        } else {
            return response()->json([
                'message' => 'Permohonan ke Pelulus 1 gagal',
            ],422);
        }
    }

    
}
