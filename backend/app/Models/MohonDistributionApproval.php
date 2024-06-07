<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MohonDistributionApproval extends Model
{
    use HasFactory;
    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $casts = [
        //'created_at' => 'datetime:Y-m-d H:i:s', // Format as datetime
        'created_at' => 'datetime:d M Y', // Format as datetime
        'updated_at' => 'datetime:Y-m-d', // Format as datetime
    ];

    public function mohonDistributionRequest() 
    {
        return $this->belongsTo(MohonDistributionRequest::class);
    }

    public function user() 
    {
        return $this->belongsTo(User::class);
    }
}
