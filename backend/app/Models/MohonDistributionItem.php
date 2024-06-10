<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MohonDistributionItem extends Model
{
    use HasFactory;
    protected $guarded = ['id', 'created_at', 'updated_at'];

    // belongsTo MohonDistributionRequest
    public function mohonDistributionRequest() 
    {
        return $this->belongsTo(MohonDistributionRequest::class);
    }

    // belongsTo Category
    public function category() 
    {
        return $this->belongsTo(Category::class);
    }

    // belongsTo Inventory
    public function inventory() 
    {
        return $this->belongsTo(Inventory::class);
    }
    
     // belongsTo MohonItem
     public function mohonItem() 
     {
         return $this->belongsTo(MohonItem::class);
     }
     

    public function mohonDistributionItemAcceptance()
    {
        return $this->hasOne(MohonDistributionItemAcceptance::class);
    }

    public function mohonDistributionItemDelivery()
    {
        return $this->hasOne(MohonDistributionItemDelivery::class);
    }
}
