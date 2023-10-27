<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'description',
    ];

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


}
