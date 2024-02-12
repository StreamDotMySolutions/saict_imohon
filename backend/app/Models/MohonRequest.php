<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MohonRequest extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function user() 
    {
        return $this->belongsTo(User::class);
    }

    public function mohonItems() 
    {
        return $this->hasMany(MohonItem::class);
    }
}
