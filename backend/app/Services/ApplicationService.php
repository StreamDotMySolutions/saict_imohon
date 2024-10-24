<?php
namespace App\Services;

use App\Models\User;
use App\Models\Application;
use App\Models\ApplicationApproval;
use App\Models\ApplicationLog;
use App\Models\ApplicationItem;
use App\Models\ApplicationItemDetail;
use Illuminate\Http\Request;

class ApplicationService
{

    public static function index($request)
    { 
        $status = $request->query('status'); // [ pending , approved , rejected ]
        $user =  auth('sanctum')->user(); // user auth
        $role = $user->roles->pluck('name')[0]; // User only have 1 role

        switch($role){

            case 'user':
            case 'manager':

                // user and manager only see data from dept only
                // only view step = 1
                $userDepartmentId = $user->userProfile->userDepartment->id; 
                $paginate = Application::query()
                                        ->with(['user.userProfile','applicationApproval','applicationItem'])
                                        ->whereHas('user.userProfile', function ($query) use ($userDepartmentId) {
                                            $query->where('user_department_id', $userDepartmentId);
                                        });

            break;

            case 'admin':
                // admin can view all data
                // where apps approved by manager
                // coming from step=1 ( dictated by applicationApprovalByManager )
                $paginate = Application::query()
                            ->with(['user.userProfile.userDepartment','applicationItem'])
                            ->whereHas('applicationApprovalByAdmin', function ($query) use ($status) {
                                $query->where('status','=', $status);
                            });
            break;
            
            case 'boss':
            break;
        }

        return $paginate->orderBy('id','DESC')->paginate(15)->withQueryString();

    }

    public static function show($application)
    {
        return Application::query()
                                ->with('user.UserProfile.UserDepartment')
                                ->with('applicationItem.applicationItemDetails')
                                ->with('applicationApproval')

                                ->where('id', $application->id)->first();
    }

    public static function store($request)
    {
        //\Log::info($request);
        $user =  auth('sanctum')->user();
        return Application::create([
            'user_id' => $user->id,
            'type' => $request->input('type'),
            'description' => $request->input('description')
        ]);
    }

    public static function storeItems($application, $request)
    {
       
        //\Log::info($request);
        if( $request->has('items') ){

            // insert into ApplicationItem
            $matchThese = ['application_id' => $application->id ];
            $data = $request->except(['application_id','items','acknowledge']);
            $applicationItem = ApplicationItem::updateOrCreate($matchThese, $data);
            unset($matchThese);
            unset($data);

            $items = json_decode($request->input('items'), true);

            foreach($items as $item => $itemDetails){
                //\Log::info($item); // jenis peralatan

                foreach( $itemDetails as $number => $itemDetail ){ 
                    // store in ApplicationItemDetail
 
                    $matchThese = [
                            'application_item_id' => $applicationItem->id,
                            'item' => $item,
                            'number' => $number,
                        ];

                    $data = [
                 
                        'description' => $itemDetail['description'],
                        'type' => $itemDetail['type']
                    ];

                    ApplicationItemDetail::updateOrCreate($matchThese, $data);
                }
            }
        }
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
        // Delete ApplicationItem if it exists
        if ($application->applicationItem) {
            $application->applicationItem->delete();
        }

        // Check if ApplicationItemDetails relationship exists and then delete ApplicationItemDetails
        if ($application->applicationItem && $application->applicationItem->applicationItemDetails) {
            $application->applicationItem->applicationItemDetails()->delete();
        }

        // Check if ApplicationMessages relationship exists and then delete ApplicationMessages
        if ($application->applicationMessages) {
            $application->applicationMessages()->delete();
        }

        // Check if ApplicationApproval relationship exists and then delete ApplicationApproval
        if ($application->applicationApproval) {
            $application->applicationApproval()->delete();
        }

        // Delete the Application record if it belongs to the authenticated user
        $user = auth('sanctum')->user();
        if ($user && $application->user_id === $user->id) {
            $application->delete();
        }

    }

    public static function setApplicationApprovalStatus($application,$status,$step)
    {
        $user =  auth('sanctum')->user();

        // update ApplicationApproval
        $matchThese = [
                        'application_id' => $application->id,
                    ];
        return ApplicationApproval::updateOrCreate($matchThese,
                                                    [
                                                        'step' => $step, // 1 is manager
                                                        'user_id' => $user->id,
                                                        'status' => $status
                                                    ]);
    }

    public static function setApplicationLog($application,$body)
    {
        $user =  auth('sanctum')->user();
        $application = Application::where('id',$application->id)->first();

        ApplicationLog::create([
            'user_id' => $user->id,
            'application_id' => $application->id,
            'status' => $application->getStatus(),
            'step' => $application->getStep(),
            'body' => $body
        ]);
    }

}