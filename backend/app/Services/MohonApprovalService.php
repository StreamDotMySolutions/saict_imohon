<?php
namespace App\Services;

use App\Models\MohonApproval;

class MohonApprovalService
{
    // role = user requesting from Manager
    // step = 1

    public static function storeByUser($request, $mohonRequestId)
    {
        //\Log::info($request);
        
        $user =  auth('sanctum')->user();
        return MohonApproval::create([
            'mohon_request_id' => $mohonRequestId,
            'user_id' => $user->id, // User that requesting approval to manager ( pelulus 1 )
            'manager_id' => $request->input('manager_id'), // which manager
            'step' => 1, // step 1 is for user requesting from manager
            'status' => 'pending'
        ]);
    }

    public static function storeByManager($request, $mohonRequestId)
    {
        // role = manager managing the request
        // if approved, requesting to Admin
        // step = 1
        $user =  auth('sanctum')->user();

        // update step 1
        // find the id with status ='pending' and mohon_request_id = $mohonRequestId
        $prevApproval = MohonApproval::query()
                                ->where('step',1)
                                ->where('mohon_request_id',$mohonRequestId)
                                ->where('status','pending')
                                ->first();
    
        //\Log::info($prevApproval);
        // Check if a record was found
        if ($prevApproval) {
            // Update the status of the retrieved record to 'approved'
            $prevApproval->update([
                'status' => 'approved',
            ]);
        }
        // MohonApproval::query()
        //                 ->where('id',$prevApproval)
        //                 ->update([
        //                     'status'  => 'approved',
        //                 ]);
  

        // create step 2
        $approval = MohonApproval::create([
            'mohon_request_id' => $mohonRequestId,
            'user_id' => $user->id, // Manager
            'step' => 2, // 2 is for manager managing
            'status' => $request->input('status')
        ]);

        // if status == approved
        // create step3 with pending status
        if( $request->input('status') == 'approved'){
            return MohonApproval::create([
                'mohon_request_id' => $mohonRequestId,
                'user_id' => $user->id, // Manager
                'step' => 3, // step 3 is for admin maanaging
                'status' => 'pending' // pending
            ]);
        } else {
            return $approval;
        }
  

    }

    public static function storeByAdmin($request, $mohonRequestId)
    {

        // role = Admin managing the request
        // step = 3
        // if processed, upgrade step to 4
        $user =  auth('sanctum')->user();
        return MohonApproval::create([
            'mohon_request_id' => $mohonRequestId,
            'user_id' => $user->id, // Admin
            'step' => 4,
            'status' => $request->input('status')
        ]);
    }

    // public static function storeStep4($request, $mohonRequestId)
    // {
    //     $user =  auth('sanctum')->user();
    //     return MohonApproval::create([
    //         'mohon_request_id' => $mohonRequestId,
    //         'user_id' => $user->id, // Boss
    //         'step' => 4,
    //         'status' => $request->input('status')
    //     ]);
    // }
}