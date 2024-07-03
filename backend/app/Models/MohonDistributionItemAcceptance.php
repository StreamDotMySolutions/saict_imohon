<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MohonDistributionItemAcceptance extends Model
{
    use HasFactory;
    protected $guarded = ['id', 'created_at', 'updated_at'];
    protected $casts = [
        //'created_at' => 'datetime:Y-m-d H:i:s', // Format as datetime
        'created_at' => 'datetime:d M Y', // Format as datetime
        'installation_date' => 'datetime:d M Y', // Format as datetime
    ];

    public function mohonDistributionItem() 
    {
        return $this->belongsTo(MohonDistributionItem::class);
    }

}
