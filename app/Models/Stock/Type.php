<?php

namespace App\Models\Stock;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Traits\HasResourceRelations;

class Type extends Model
{
    use SoftDeletes, HasResourceRelations;

    protected $resourceRelations = ['brand', 'variants'];

    protected $fillable = ['name',];

    protected $with = ['variants'];

    protected static function boot()
    {
        parent::boot();

        static::deleting(function($type) {
            $type->variants->each(function ($variant) {
                $variant->delete();
            });
        });

        static::restoring(function($type) {
            $type->variants()->withTrashed()->get()->each(function ($variant) {
                $variant->restore();
            });
        });
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function variants()
    {
        return $this->hasMany(Variant::class);
    }

}
