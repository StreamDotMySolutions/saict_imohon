<?php
namespace App\Services;

use App\Models\User;
use App\Models\Application;
use Illuminate\Http\Request;

class ApplicationService
{
    public static function index(){}

    public static function show($application){}

    public static function store($request){
        \Log::info($request);
    }

    public static function update($request){}

    public static function delete($application){}
}