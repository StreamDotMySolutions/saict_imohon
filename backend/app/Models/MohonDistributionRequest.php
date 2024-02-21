<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MohonDistributionRequest extends Model
{
    use HasFactory;
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function mohonRequest() 
    {
        return $this->belongsTo(MohonRequest::class);
    }

    public function user() 
    {
        return $this->belongsTo(User::class);
    }
}
