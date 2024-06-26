<?php
namespace App\Services;

use App\Models\MohonRequest;
use App\Models\MohonApproval;

class MohonApprovalService
{
    // role = user requesting from Manager
    // step = 1

    public static function storeByUser($request, $mohonRequestId)
    {
        //\Log::info($request);
        
        $user =  auth('sanctum')->user();

        // update existing mohonRequest
        MohonRequest::where('id',$mohonRequestId)->update([
            'status' => 'pending',
            'step' => 1,
            'approver_id' => $request->input('manager_id') 
        ]);

        // create record in MohonApproval for record keeping
        return MohonApproval::create([
            'mohon_request_id' => $mohonRequestId,
            'user_id' => $user->id, // User that requesting approval to manager ( pelulus 1 )
            'requester_id' =>  $user->id, // User that requesting approval to manager ( pelulus 1 )
            'approver_id' =>  $request->input('manager_id'), // the one who will approve the request
            'manager_id' => $request->input('manager_id'), // which manager


            'step' => 1, // step 1 is for user requesting from manager
            'status' => 'pending',
            'message' => "{$user->name} ( {$user->nric} ) membuat permohonan ke Pelulus 1",
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
        // $prevApproval = MohonApproval::query()
        //                         ->where('step',1)
        //                         ->where('mohon_request_id',$mohonRequestId)
        //                         ->where('status','pending')
        //                         ->first();
    
        // //\Log::info($prevApproval);
        // // Check if a record was found
        // if ($prevApproval) {
        //     // Update the status of the retrieved record to 'approved'
        //     $prevApproval->update([
        //         'status' => 'approved',
        //     ]);
        // }

        // update MohonRequest 
        MohonRequest::where('id',$mohonRequestId)->update([
            'status' => $request->input('status'), //either approved or rejected
            'step' => 2, // step 2 = role  pelulus-1
            'approver_id' => $user->id, // Manager
        ]);

        // create step 2
        $approval = MohonApproval::create([
            'mohon_request_id' => $mohonRequestId,
            'user_id' => $user->id, // Manager
            
            'approver_id' =>  $user->id, // the one who approve / reject the request
            'requester_id' =>  $user->id, // User that requesting approval to manager ( pelulus 1 )
            'manager_id' =>  $user->id, // User that requesting approval to manager ( pelulus 1 )
           
            'step' => 2, // 2 is for manager managing
            'status' => $request->input('status'), // status
            'message' => $request->input('message') // message by pelulus-1
        ]);

        // if status == approved
        // create step3 with pending status
        if( $request->input('status') == 'approved'){

            MohonRequest::where('id',$mohonRequestId)->update([
                'status' => 'pending', //either approved or rejected
                'step' => 3, // step 2 = role  pelulus-1
                //'approver_id' => $user->id, // requesting  ANY admin
            ]);

            return MohonApproval::create([
                'mohon_request_id' => $mohonRequestId,
                'user_id' => $user->id, // Manager

                'requester_id' =>  $user->id, // User that requesting approval to manager ( pelulus 1 )
                'manager_id' =>  $user->id, // User that requesting approval to manager ( pelulus 1 )
                'message' => "{$user->name} ( {$user->nric} ) membuat permohonan ke Admin",
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

        MohonRequest::where('id',$mohonRequestId)->update([
            'status' => $request->input('status'), //either approved or rejected
            'step' => 4, // step 4 is final
            'approver_id' => $user->id, // latest approver
            'admin_id' => $user->id, // Admin
        ]);

        return MohonApproval::create([
            'mohon_request_id' => $mohonRequestId,
            'user_id' => $user->id, // Admin
            'requester_id' => $user->id, // the one who request the request
            'approver_id' => $user->id, // the one who will approve the request
            'admin_id' =>  $user->id, // User that requesting approval to manager ( pelulus 1 )
            'step' => 4,
            'message' => "Admin memproses permohonan",
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