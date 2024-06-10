<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MohonDistributionRequest extends Model
{
    use HasFactory;
    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $casts = [
        //'created_at' => 'datetime:Y-m-d H:i:s', // Format as datetime
        'created_at' => 'datetime:d M Y', // Format as datetime
    ];

    public function mohonRequest() 
    {
        return $this->belongsTo(MohonRequest::class);
    }

    public function mohonItem() 
    {
        return $this->belongsTo(MohonItem::class);
    }

    public function user() 
    {
        return $this->belongsTo(User::class);
    }

    // hasMany MohonDistributionItem
    public function mohonDistributionItems() 
    {
        return $this->hasMany(MohonDistributionItem::class);
    }

    public function mohonDistributionApproval() 
    {
        /*
        * Latest Mohon Approval Status
        */
        return $this->hasOne(MohonDistributionApproval::class)
                    ->latest();
    }



    public function mohonDistributionApprovals() 
    {
        /*
        * All Mohon Distribution Requests
        */
        return $this->hasMany(MohonDistributionApproval::class);
    }
}
