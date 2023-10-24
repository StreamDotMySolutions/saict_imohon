<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ApplicationService;
use App\Http\Requests\StoreApplicationRequest;
use App\Http\Requests\UpdateApplicationRequest;

class ApplicationController extends Controller
{
    public function index(){
        ApplicationService::index();
    }

    public function show(Application $application){
        ApplicationService::show( $application);
    }

    public function store(StoreApplicationRequest $request){
        ApplicationService::store($request);
    }

    public function update(Application $application,UpdateApplicationRequest $request){
        ApplicationService::update($request);
    }

    public function delete(Application $application){
        ApplicationService::delete( $application);
    }
}
