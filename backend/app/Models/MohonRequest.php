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

    public function approvalByPelulus1() 
    {
        /*
        * Pelulus 1
        */
        return $this->hasOne(MohonApproval::class)
                    ->where('step', 1)->latest();
    }

    public function approvalByPelulus2() 
    {
        /*
        * Pelulus 2
        */
        return $this->hasOne(MohonApproval::class)
                    ->where('step', 2)->latest();
    }
}
