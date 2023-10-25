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

    public function scopeByUserDepartment($query, $userDepartmentId)
    {
        return $query
            ->join('users', 'applications.user_id', '=', 'users.id')
            ->join('user_profiles', 'users.id', '=', 'user_profiles.user_id')
            ->where('user_profiles.user_department_id', $userDepartmentId);
    }
}
