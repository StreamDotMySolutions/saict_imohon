<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    protected $protected = [
        'id'
    ];

    public function subcategory(){
        //return $this->hasMany('App\Category', 'parent_id');
        return $this->hasMany(Category::class, 'parent_id');
    }
}
