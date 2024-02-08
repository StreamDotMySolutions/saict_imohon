<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MohonController extends Controller
{
    public function store(Request $request)
    {
        \Log::info($request);
    }
}
