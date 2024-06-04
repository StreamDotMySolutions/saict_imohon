<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MohonApproval extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    protected $casts = [
        //'created_at' => 'datetime:Y-m-d H:i:s', // Format as datetime
        // 'created_at' => 'datetime:Y-m-d', // Format as datetime
        // 'updated_at' => 'datetime:Y-m-d', // Format as datetime
    ];

    public function mohonRequest() 
    {
        return $this->belongsTo(MohonRequest::class);
    }

    public function user() 
    {
        return $this->belongsTo(User::class);
    }
}
