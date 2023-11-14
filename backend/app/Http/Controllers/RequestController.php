<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RequestController extends Controller
{
    public function index()
    {
        // Logic to show a list of posts
    }

    public function store(Request $request)
    {
        // Logic to store a new post
    }

    public function show($id)
    {
        // Logic to show a specific post
    }

    public function update(Request $request, $id)
    {
        // Logic to update a specific post
    }

    public function destroy($id)
    {
        // Logic to delete a specific post
    }
}
