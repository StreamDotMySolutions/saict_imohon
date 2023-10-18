<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kalnoy\Nestedset\NodeTrait;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserDepartment extends Model
{
    use HasFactory;
    use NodeTrait;
    use SoftDeletes;

    protected $fillable = [
        'name',
    ];
}
