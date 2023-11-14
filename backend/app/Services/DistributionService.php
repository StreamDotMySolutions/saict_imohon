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

}