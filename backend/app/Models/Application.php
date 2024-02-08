<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class Application extends Model
{
    use HasFactory;
    use LogsActivity;

    protected $guarded = ['id', 'created_at', 'updated_at'];
    protected $appends = ['deleteable', 'editable','manager_editable','admin_editable','created_at_formatted'];

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
        return $this->hasOne(ApplicationApproval::class)->where('step', 2);
    }

    public function applicationApproval() 
    {
        return $this->hasOne(ApplicationApproval::class)->latest();
    }

    public function distribution() 
    {
        return $this->hasOne(Distribution::class)->where('status', 'approved')->latest();
    }

    public function applicationItem() 
    {
        return $this->hasOne(ApplicationItem::class)->latest();
    }

    public function applicationItems() 
    {
        return $this->hasMany(ApplicationItem::class);
    }

    public function applicationMessages() 
    {
        return $this->hasMany(ApplicationMessage::class)->latest();
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
        if (isset($this->applicationApproval->status) && $this->applicationApproval->status === 'rejected') {
            return true;
        }
        if (isset($this->applicationApproval->status) && $this->applicationApproval->status === 'pending' && $this->applicationApproval->step === 1) {
            return true;
        }

        return false;
    }

    public function getEditableAttribute()
    {
        // Define your logic to determine if the application is deleteable.


        if ( isset($this->applicationApproval->status) && $this->applicationApproval->status === 'pending' && $this->applicationApproval->step === 1) {
            return true;
        }

        return false;
    }

    public function getManagerEditableAttribute()
    {

        if ( isset($this->applicationApproval->status) && $this->applicationApproval->status === 'pending' && $this->applicationApproval->step === 1) {
            return true;
        }

        return false;
    }

    public function getAdminEditableAttribute()
    {

        // approved by ketua-jabatan
        if (isset($this->applicationApprovalByAdmin->status) && $this->applicationApprovalByAdmin->status === 'pending' && $this->applicationApproval->step === 2) {
            return true;
        }

        return false;
    }
    
    public function getCreatedAtFormattedAttribute()
    {
        return $this->created_at->format('d/m/y');
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->logAll();
    }
}
