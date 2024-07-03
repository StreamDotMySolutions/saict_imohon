<?php
namespace App\Services;

use App\Models\MohonDistributionRequest;
use App\Models\MohonDistributionApproval;
use App\Services\MohonDistributionApprovalService;
use DB;

class MohonDistributionRequestService
{

    /*
    * To show MohonDistribution Request
    * by MohonRequestId
    * MohonRequest hasMany MohonDistributionRequest
    */
    public static function index($mohonRequestId)
    {
        $user =  auth('sanctum')->user(); // user auth
        $role = $user->roles->pluck('name')[0]; // User only have 1 role
        //\Log::info($user);
   
        switch($role){
            case 'admin':
                $requests = self::getMohonDistributionRequestAsAdmin($mohonRequestId);
            break;

            case 'boss':
                $requests = self::getMohonDistributionRequestAsBoss();
            break;

            default:
                $requests = [];
            break;
        }

        return $requests;
    }

    /*
    * Only list MohonDistributionRequest Step = 0 
    */
    public static function getMohonDistributionRequestAsAdmin($mohonRequestId)
    {

        $paginate = MohonDistributionRequest::query(); // Intiate Paginate
        $requests = $paginate->orderBy('id','DESC')
                    //->with(['mohonApproval'])
                    ->with([
                        'user.userProfile',
                        'mohonDistributionApproval'
                        ])

                    // only list where step = 1
                    // ->whereHas('mohonApproval', function ($query) {
                    //     $query->where('status', 'approved')->where('step', 2);
                    // })

                    ->withCount(['mohonDistributionItems']) // to calculate how many items
                    ->where('mohon_request_id', $mohonRequestId) // by mohon_request_id
                    
                    ->paginate(10) // 10 items per page
                    ->withQueryString(); // with GET Query String
                               
        return $requests;
    }

    /*
    * Only list MohonDistributionRequest Step = 1 
    */
    public static function getMohonDistributionRequestAsBoss($status)
    {

        $user =  auth('sanctum')->user(); // user auth

        $paginate = MohonDistributionRequest::query(); // Initiate Paginate

        $requests = $paginate->orderBy('id', 'DESC')
                            ->with(['user.userProfile', 'mohonDistributionApproval' => function ($query) {
                                $query->orderBy('step', 'desc')->orderBy('updated_at', 'desc');
                    }])
                    ->whereHas('mohonDistributionApprovalByBoss', function ($query) use ($status,$user) {
                        $query->whereIn('id', function ($subQuery) {
                            $subQuery->select(DB::raw('MAX(id)'))
                                ->from('mohon_distribution_approvals')
                                ->groupBy('mohon_distribution_request_id');
                        });

                        switch ($status) {
                            case 'pending':
                                //\Log::info($status);
                                // only list where step = 1
                                $query->where('step', 1)
                                    ->where('boss_id', $user->id)
                                    ->where('status', $status);
                                break;

                            case 'approved':
                                // only list where step = 2
                                $query->where('step', 2)
                                    ->where('boss_id', $user->id)
                                    ->where('status', $status);
                                break;

                            case 'rejected':
                                // only list where step = 2
                                $query->where('step', 2)
                                    ->where('boss_id', $user->id)
                                    ->where('status', $status);
                                break;
                        }
                    })
                    ->withCount(['mohonDistributionItems']) // to calculate how many items
                    ->paginate(10) // 10 items per page
                    ->withQueryString(); // with GET Query String

                return $requests;

    }



    /*
    * Admin requesting approval from Boss
    * on allocated Item based on Permohonan
    */

    public static function store($request, $mohonRequestId)
    {

        //\Log::info($request);
        $user =  auth('sanctum')->user();
        $mohonDistributionRequest = MohonDistributionRequest::create([
            'mohon_request_id' => $mohonRequestId,
            'user_id' => $user->id,
            'title' => $request->input('title'),
            'description' => $request->input('description')
        ]);

        // create MohonApproval
        // $mohonDistributionApproval = MohonDistributionApproval::create([
        //     'mohon_distribution_request_id' => $mohonDistributionRequest->id,
        //     'user_id' => $user->id,
        //     'step' => 0,
        //     'status' => 'pending',
        // ]);
        MohonDistributionApprovalService::storeStep0($mohonDistributionRequest->id);

        return  $mohonDistributionRequest;
    }

    public static function show($id)
    {
       
        $request = MohonDistributionRequest::query()
                    ->where('id', $id)
                    ->with([
                        'mohonRequest',
                        'mohonRequest.mohonItems', 
                        'mohonRequest.mohonItems.category',
                        'mohonDistributionApproval',
                        'mohonDistributionApprovalApprovedByUser',
                        'mohonDistributionApprovalRejectedByUser',
                        'mohonDistributionItems.category',
                        'mohonDistributionItems.inventory', 
                        'mohonDistributionItems.mohonItem',
                        'mohonDistributionItems.mohonDistributionItemDelivery',
                        'mohonDistributionItems.mohonDistributionItemAcceptance',
                        
                        ])
                    //->with(['application.user.userProfile.userDepartment'])
                    ->first();
        return $request;
    }

    public static function update($request, $id)
    {
        $user =  auth('sanctum')->user();
        return MohonDistributionRequest::query()
                            ->where('user_id', $user->id)
                            ->where('id',$id)
                            ->update([
                                'title'  => $request->input('title'),
                                'description'  => $request->input('description'),
                                ]);
    }

    // public static function delete($id)
    // {
    //     $user =  auth('sanctum')->user();

        
        
    //     return MohonDistributionRequest::query()
    //                         ->where('user_id', $user->id)
    //                         ->where('id',$id)
    //                         ->delete();
    // }

    public static function delete($id)
    {
        $user = auth('sanctum')->user();

        $distributionRequest = MohonDistributionRequest::where('user_id', $user->id)
                                                    ->findOrFail($id);

        // Assuming you want to delete the related items as well
        $distributionRequest->mohonDistributionItems()->each(function ($distributionItem) {
            $distributionItem->delete();
        });

        return $distributionRequest->delete();
    }

}