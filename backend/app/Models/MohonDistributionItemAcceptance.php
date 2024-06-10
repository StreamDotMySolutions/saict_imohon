<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MohonDistributionItemAcceptance extends Model
{
    use HasFactory;
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function mohonDistributionItem() 
    {
        return $this->belongsTo(MohonDistributionItem::class);
    }

}
