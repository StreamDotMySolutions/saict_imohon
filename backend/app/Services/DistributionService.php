<?php 
namespace App\Services;

use App\Models\Distribution;
use Illuminate\Http\Request;

class DistributionService
{
    public static function index()
    {
      
        $page = \Request::input('page');
        \Log::info($page);

       $cached = \Cache::rememberForever('cached_distribution_index_' . $page , function () {
            $paginate = Distribution::query()->with('application.user.userProfile.userDepartment');
            $distributions = $paginate->orderBy('id','DESC')
                                    ->paginate(10)
                                    ->withQueryString();
        
            return $distributions;
        });

        return $cached;
    }

    public static function store(Request $request)
    {
        $user =  auth('sanctum')->user();
        $distribution = new Distribution($request->except('acknowledge'));
        $distribution->user_id = $user->id;
        $distribution->save();
        \Cache::flush(); 
        //\Cache::forget('cached_distribution_' . $distribution->id); 
        return $distribution;
    }

    public static function update($distribution,Request $request)
    {
        $user =  auth('sanctum')->user();
        $updated = Distribution::query()
                            //->where('user_id', $user->id)
                            ->where('id',$distribution->id)
                            ->update($request->except('acknowledge','_method'));
        \Cache::flush(); 
        //\Cache::forget('cached_distribution_' . $distribution->id);    
        return $updated;                
    }

    public static function show(Distribution $distribution)
    {
        //\Cache::forget('cached_distribution_' . $distribution->id); 
        $cached = \Cache::rememberForever('cached_distribution_' . $distribution->id , function () use ($distribution) {
            // with('application.user.userProfile.userDepartment')
            // Load relationships before caching
            $distribution->load(['application.user.userProfile.userDepartment']);
            return $distribution;
        });

        return $cached;
    
        // The $cached variable now contains the cached Distribution instance.
    }
    

    public static function destroy($distribution)
    {
        $user =  auth('sanctum')->user();
        $distribution = Distribution::query()
                            //->where('user_id', $user->id)
                            ->where('id',$distribution->id)
                            ->delete();
        return $distribution;
    }

}