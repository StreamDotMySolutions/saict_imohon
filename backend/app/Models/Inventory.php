<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class Inventory extends Model
{
    use HasFactory;
    use LogsActivity;
    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $casts = [
        'date_start' => 'datetime:d/m/Y',
        'date_end' => 'datetime:d/m/Y',
        'received_on' => 'datetime:d/m/Y',
    ];

    // belongsTo Category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // hasMany MohonDistributionItem
    public function mohonDistributionItems()
    {
        return $this->hasMany(MohonDistributionItem::class);
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->logAll();
    }

}
