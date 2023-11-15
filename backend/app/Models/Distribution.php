<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Distribution extends Model
{
    use HasFactory;
    protected $guarded = ['id', 'created_at', 'updated_at'];
    protected $appends = ['created_at_formatted'];


    public function getCreatedAtFormattedAttribute()
    {
        return $this->created_at->format('d/m/y');
    }

    public function application() 
    {
        return $this->belongsTo(Application::class)->latest();
    }
}
