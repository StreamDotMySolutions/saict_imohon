<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CategoryService;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index(){

        $categories = Category::withDepth()
            ->with('ancestors')
            ->get()
            ->toTree();

        return response()->json([
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        \Log::info($request);
        // CategoryService::store($request->all());

        $category =  Category::create($request->only('name'));

        if ($request->has('parent_id')) {
            $parent_id = $request->input('parent_id');

            if (!is_null($parent_id) && !empty($parent_id)) {
                $node = Category::find($parent_id);
                $node->appendNode($category);
            } else {
                // Handle the case where parent_id is null or empty
            }
        } else {
            // Handle the case where parent_id is not present in the request
        }

        return response()->json(['message' => 'success']);
    }
}
