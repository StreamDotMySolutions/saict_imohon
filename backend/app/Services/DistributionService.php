<?php 
namespace App\Services;

use App\Models\Distribution;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class DistributionService
{
    public static function index()
    {
        $paginate = Distribution::query();
        $distributions = $paginate->orderBy('id','DESC')
                                ->paginate(10)
                                ->withQueryString();
    
        return $distributions;
    }

    public static function store(Request $request)
    {
        $user =  auth('sanctum')->user();
        $distribution = new Distribution($request->except('acknowledge'));
        $distribution->user_id = $user->id;
        $distribution->save();
        return $distribution;
    }

    public static function update($distribution,Request $request)
    {
        $user =  auth('sanctum')->user();
        return Distribution::query()
                            //->where('user_id', $user->id)
                            ->where('id',$distribution->id)
                            ->update($request->except('acknowledge','_method'));
    }

    public static function show(Distribution $distribution)
    {
        //\Log::info($distribution);
        return $distribution;
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