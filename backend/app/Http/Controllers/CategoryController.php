<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CategoryService;

class CategoryController extends Controller
{
    public function index(){
        $parentCategories = Category::where('parent_id',NULL)->get();
        return response()->json([
            'parentCategories' => $parentCategories
        ]);
    }

    public function store(Request $request)
    {
        CategoryService::store($request);
        return response()->json(['message' => 'success']);
    }
}
