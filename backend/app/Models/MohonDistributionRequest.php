<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MohonDistributionRequest extends Model
{
    use HasFactory;
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function mohonRequest() 
    {
        return $this->belongsTo(MohonRequest::class);
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
