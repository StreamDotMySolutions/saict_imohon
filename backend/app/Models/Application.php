<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];
    protected $appends = ['deleteable', 'editable','manager_editable','admin_editable'];

    public function user() 
    {
        return $this->belongsTo(User::class);
    }

    public function applicationApprovalByManager() 
    {
        return $this->hasOne(ApplicationApproval::class)->where('step', 1)->latest();
    }

    
    public function applicationApprovalByAdmin() 
    {
        return $this->hasOne(ApplicationApproval::class)->where('step', 2)->latest();
    }

    public function applicationApproval() 
    {
        return $this->hasOne(ApplicationApproval::class)->latest();
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

    public function getManagerEditableAttribute()
    {

        if ($this->applicationApproval->status === 'pending' && $this->applicationApproval->step === 1) {
            return true;
        }

        return false;
    }

    public function getAdminEditableAttribute()
    {

        if ($this->applicationApproval->status === 'success' && $this->applicationApproval->step === 2) {
            return false;
        }

        if ($this->applicationApproval->status === 'rejected' && $this->applicationApproval->step === 2) {
            return false;
        }

        if ($this->applicationApproval->status === 'pending' && $this->applicationApproval->step === 2) {
            return true;
        }


        return false;
    }
    

}
