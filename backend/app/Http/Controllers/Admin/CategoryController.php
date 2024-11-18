<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Models\Category;

class CategoryController extends Controller
{


    public function index()
    {
        
        $node =  Category::where('name','items')->first(); // where name = items
        $categories = Category::whereDescendantOf($node)->get();
        
        if($categories->isNotEmpty()){
            return response()->json(['categories' => $categories]);
        }else{
            return response()->json(['message' => 'Please insert item in Category Model']);
        }
    }

}
