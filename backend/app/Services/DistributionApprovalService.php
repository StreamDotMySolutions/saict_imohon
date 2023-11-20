<?php 
namespace App\Services;

use App\Models\Distribution;
use Illuminate\Http\Request;

class DistributionApprovalService 
{
    public static function index()
    {
      
        $page = \Request::input('page'); // cache by page

        if (app()->environment('local', 'testing')) {
            \Cache::flush();
        }
        // cache key ~ cached_distribution_index_1, cached_distribution_index_2
        $cached = \Cache::rememberForever('cached_distribution_approval_index_' . $page , function () {
            $paginate = Distribution::query()
                                        ->where('status','pending')
                                        ->with('application.user.userProfile.userDepartment');
            $distributions = $paginate->orderBy('id','DESC')
                                    ->paginate(10)
                                    ->withQueryString();
        
            return $distributions;
        });

        return $cached; // return cached data
    }

    public static function show($distribution)
    {
        if (app()->environment('local', 'testing')) {
            \Cache::flush();
        }
        $cached = \Cache::rememberForever('cached_distribution_approval_' . $distribution, function () use ($distribution) {
            // with('application.user.userProfile.userDepartment')
            // Load relationships before caching
            $distribution = Distribution::query()
                        ->where('id', $distribution)
                        ->with(['application.user.userProfile.userDepartment'])
                        ->first();
            return $distribution;
        });

        return $cached;
    
        // The $cached variable now contains the cached Distribution instance.
    }


}