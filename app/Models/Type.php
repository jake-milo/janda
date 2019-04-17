<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Traits\HasResourceRelations;

class Type extends Model
{
    use SoftDeletes, HasResourceRelations;

    protected $resourceRelations = ['brand', 'variants'];

    protected $fillable = ['name',];

    protected $with = ['variants'];

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function variants()
    {
        return $this->hasMany(Variant::class);
    }

}
