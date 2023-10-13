<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->post('/users/store', function (Request $request) {
    \Log::info($request);
});

