<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Illuminate\Database\Eloquent\Relations\BelongsTo; // Import BelongsTo

class Distribution extends Model
{
    use HasFactory;
    use SoftDeletes;
    use LogsActivity;

    protected static $logEvents = ['created', 'updated', 'deleted'];
    protected $guarded = ['id'];
    protected $appends = ['created_at_formatted'];


    public function getCreatedAtFormattedAttribute()
    {
        return $this->created_at->format('d/m/y');
    }

    public function application()
    {
        return $this->belongsTo(Application::class)->latest();
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->logAll();
    }
}
