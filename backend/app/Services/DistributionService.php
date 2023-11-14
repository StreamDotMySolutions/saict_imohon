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

}