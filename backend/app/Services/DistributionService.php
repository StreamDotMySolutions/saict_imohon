<?php 
namespace App\Services;

use App\Models\Distribution;
use Illuminate\Http\Request;

class DistributionService
{
    public static function index()
    {
      
        $page = \Request::input('page'); // cache by page

        // cache key ~ cached_distribution_index_1, cached_distribution_index_2
        $cached = \Cache::rememberForever('cached_distribution_index_' . $page , function () {
            $paginate = Distribution::query()->with('application.user.userProfile.userDepartment');
            $distributions = $paginate->orderBy('id','DESC')
                                    ->paginate(10)
                                    ->withQueryString();
        
            return $distributions;
        });

        return $cached; // return cached data
    }

    public static function store(Request $request)
    {
        $user =  auth('sanctum')->user();
        $distribution = new Distribution($request->except('acknowledge'));
        $distribution->user_id = $user->id; 
        $distribution->save(); // trigger logActivity
        \Cache::flush(); // rebuild Cache
        //\Cache::forget('cached_distribution_' . $distribution->id); 
        return $distribution;
    }

    public static function update($distribution,Request $request)
    {
        $user =  auth('sanctum')->user();
        $distribution = Distribution::query()
                            //->where('user_id', $user->id)
                            ->where('id',$distribution->id)
                            ->first();
        $updated = $distribution->update($request->except('acknowledge','_method'));  // trigger LogActivity
        \Cache::flush(); 
        //\Cache::forget('cached_distribution_' . $distribution->id);    
        return $updated;                
    }

    public static function destroy($distribution)
    {
        $user =  auth('sanctum')->user();
        $distribution = Distribution::query()
                            //->where('user_id', $user->id)
                            ->where('id',$distribution->id)
                            ->first();
        $distribution->delete(); // this will trigger logActivity()
        \Cache::flush();
        return $distribution;
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
    


}