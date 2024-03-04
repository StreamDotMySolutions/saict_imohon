<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MohonRequest extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    // belongsTo User
    public function user() 
    {
        return $this->belongsTo(User::class);
    }

    // hasMany MohonItem
    public function mohonItems() 
    {
        return $this->hasMany(MohonItem::class);
    }

    public function mohonApproval() 
    {
        /*
        * Latest Mohon Approval Status
        */
        return $this->hasOne(MohonApproval::class)
                    ->orderBy('id','DESC');
    }

    public function mohonApprovals() 
    {
        /*
        * All Approvals
        */
        return $this->hasMany(MohonApproval::class)
                    ->orderBy('id','DESC');
    }

    public function mohonDistributionRequests() 
    {
        /*
        * All Mohon Distribution Requests
        */
        return $this->hasMany(MohonDistributionRequest::class)
                    ->orderBy('id','DESC');
    }

    public function mohonDistributionItems()
    {
        /*
        * Items in Mohon Distribution Requests
        */
        return $this->hasManyThrough(MohonDistributionItem::class,MohonDistributionRequest::class);
    }


}
