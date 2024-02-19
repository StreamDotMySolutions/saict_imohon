<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MohonItem extends Model
{
    use HasFactory;
    protected $guarded = ['id', 'created_at', 'updated_at'];

    // belongsTo MohonRequest
    public function mohonRequest() 
    {
        return $this->belongsTo(MohonRequest::class);
    }

    // belongsTo Category
    public function category() 
    {
        return $this->belongsTo(Category::class);
    }
}
