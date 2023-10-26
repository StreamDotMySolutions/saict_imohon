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


}
