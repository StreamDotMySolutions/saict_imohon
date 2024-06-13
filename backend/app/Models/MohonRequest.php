<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class MohonRequest extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $casts = [
        //'created_at' => 'datetime:Y-m-d H:i:s', // Format as datetime
        'created_at' => 'datetime:d M Y', // Format as datetime
    ];

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
                    ->latest();
    }

    public function mohonApprovalByStatus($status)
    {
        return $this->hasOne(MohonApproval::class)
                    ->latest('id')
                    ->where('status', $status);
    }



    public function mohonApprovalPending()
    {
        return $this->hasOne(MohonApproval::class)
                    ->latest('id')
                    ->where('status', 'pending');
    }

    public function mohonApprovalApproved()
    {
        return $this->hasOne(MohonApproval::class)
                    ->latest('id')
                    ->where('status', 'approved');
    }

    public function mohonApprovalRejected()
    {
        return $this->hasOne(MohonApproval::class)
                    ->latest('id')
                    ->where('status', 'rejected');
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
