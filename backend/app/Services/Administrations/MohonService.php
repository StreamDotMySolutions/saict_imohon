<?php
namespace App\Services\Administrations;

use App\Models\MohonRequest;
use App\Models\MohonApproval;
use Illuminate\Http\Request;

class MohonService
{

    public static function index()
    {
        $user =  auth('sanctum')->user(); // user auth
        $role = $user->roles->pluck('name')[0]; // User only have 1 role
        //\Log::info($user);
   
        switch($role){


            case 'admin':
                $mohons = self::getMohonDataAsAdmin();
            break;

            default:
                $mohons = [];
            break;
        }

        return $mohons;
    }

   

    /*
    * list all permohonan
    */
    public static function getMohonDataAsAdmin()
    {

        //\Log::info('pengurusan mohon');
        $paginate = MohonRequest::query(); // Intiate Paginate
        $mohons = $paginate->orderBy('id','DESC')
                    //->with(['mohonApproval'])
                    ->with(['user.userProfile.userDepartment','mohonApproval'])

                    ->withCount(['mohonItems']) // to calculate how many items
                    
                    ->paginate(10) // 10 items per page
                    ->withQueryString(); // with GET Query String
                               
    
        return $mohons;
    }





    public static function show($id)
    {
        $request = MohonRequest::query()
                    ->where('id', $id)
                    ->with(['mohonApproval.user.userProfile','mohonItems.category','user.userProfile.userDepartment'])
                    ->withCount(['mohonItems'])
                    //->with(['application.user.userProfile.userDepartment'])
                    ->first();
        return $request;
    }

    public static function update($request, $id)
    {
        $user =  auth('sanctum')->user();
        return MohonRequest::query()
                            //->where('user_id', $user->id)
                            ->where('id',$id)
                            ->update([
                                'title'  => $request->input('title'),
                                'description'  => $request->input('description'),
                            ]);
    }

    public static function delete($id)
    {
        // Find the MohonRequest instance by its ID
        $mohonRequest = MohonRequest::findOrFail($id);

        // Delete MohonItems
        $mohonRequest->mohonItems()->delete();

        // Delete MohonApproval
        $mohonRequest->mohonApproval()->delete();

        // Delete MohonDistributionRequest
        $mohonRequest->mohonDistributionRequests()->each(function ($distributionRequest) {
            // delete items
            $distributionRequest->mohonDistributionRequestItems()->delete();
            // delete agihan request
            $distributionRequest->mohonDistributionApproval()->delete();
        });


        return $mohonRequest->delete();
    }
}