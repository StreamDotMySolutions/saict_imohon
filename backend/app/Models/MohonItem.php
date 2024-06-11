<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MohonItem extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s', // Format as datetime
    ];

    // belongsTo MohonRequest
    public function mohonRequest() 
    {
        return $this->belongsTo(MohonRequest::class);
    }

    // hasOne MohonDistributionItem
    public function mohonDistributionItem() 
    {
        return $this->hasOne(MohonDistributionItem::class);
    }


    // belongsTo Category
    public function category() 
    {
        return $this->belongsTo(Category::class);
    }

 
}
