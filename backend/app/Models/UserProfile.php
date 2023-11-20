<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class UserProfile extends Model
{
    use SoftDeletes;
    use LogsActivity;
    
    use HasFactory;
    protected $fillable = [
        'user_id',
        'user_department_id',
        'name',
        'occupation',
        'nric',
        'phone',
        'address',
    ];

    public function userDepartment(){
        return $this->belongsTo(UserDepartment::class);
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->logAll();
    }


}
