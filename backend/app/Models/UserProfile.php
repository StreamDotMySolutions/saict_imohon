<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
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

}
