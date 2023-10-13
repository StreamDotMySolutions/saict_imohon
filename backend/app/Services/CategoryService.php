<?php
namespace App\Services;

use App\Models\Category;

class CategoryService
{
    public static function store($categoryData){
        $category = Category::create($categoryData);
        return $category;
    }
}
