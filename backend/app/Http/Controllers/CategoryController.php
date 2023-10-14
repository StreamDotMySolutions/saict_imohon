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

        $category =  Category::create($request->only('name')); // create node

        if ($request->has('parent_id')) {
            $parent_id = $request->input('parent_id'); // submitted by dropdown

            if (!is_null($parent_id) && !empty($parent_id)) {
                $node = Category::find($parent_id); // find the node
                $node->appendNode($category); // assign created category to that node
            } 
        }

        return response()->json(['message' => 'success']);
    }

    public function update(Request $request, Category $category)
    {
        // Validate the request data if necessary
        $this->validate($request, [
            'name' => 'required|string|max:255',
        // Add validation rules for other attributes
        ]);

        // Update the category attributes
        $category->name = $request->input('name');
 
        // Save the changes to the database
        $category->save();

        return response()->json(['message' => 'success']);
    }

    public function destroy(Category $category)
    {
        $category->delete(); // delete the node
        return response()->json(['message' => 'success']);
    }

    public function ordering(Category $category, $direction)
    {
        
        \Log::info($direction);
        
        //$node->down();
    }
}

