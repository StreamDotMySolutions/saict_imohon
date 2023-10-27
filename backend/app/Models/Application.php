<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];
    protected $appends = ['deleteable', 'editable'];

    public function user() 
    {
        return $this->belongsTo(User::class);
    }

    public function applicationApprovalByManager() 
    {
        return $this->hasOne(ApplicationApproval::class)->where('step', 1);
    }

    public function applicationApproval() 
    {
        return $this->hasOne(ApplicationApproval::class)->where('step', 1);
    }

    public function getStatus()
    {
        if ($this->applicationApproval) {
            return $this->applicationApproval->status;
        }
        
        return null; // Or you can return a default status if there's no approval record.
    }

    public function getStep()
    {
        if ($this->applicationApproval) {
            return $this->applicationApproval->step;
        }
        
        return null; // Or you can return a default status if there's no approval record.
    }

    /**
     * Determine if the application can be deleted.
     *
     * @return bool
     */
    public function getDeleteableAttribute()
    {
        // Define your logic to determine if the application is deleteable.
        if ($this->applicationApproval->status === 'rejected') {
            return true;
        }

        if ($this->applicationApproval->status === 'pending' && $this->applicationApproval->step === 1) {
            return true;
        }

        return false;
    }

    /**
     * Determine if the application can be deleted.
     *
     * @return bool
     */
    public function getEditableAttribute()
    {
        // Define your logic to determine if the application is deleteable.
        if ($this->applicationApproval->status === 'rejected') {
            return true;
        }

        if ($this->applicationApproval->status === 'pending' && $this->applicationApproval->step === 1) {
            return true;
        }

        return false;
    }

}
