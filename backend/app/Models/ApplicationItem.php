<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class ApplicationItem extends Model
{
    use HasFactory;
    use LogsActivity;
    protected $guarded = ['id', 'created_at', 'updated_at'];
    

    public function applicationItemDetails() 
    {
        return $this->hasMany(ApplicationItemDetail::class);
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->logAll();
    }

}
