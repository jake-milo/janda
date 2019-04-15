<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Traits\HasResourceRelations;

class Type extends Model
{
    use SoftDeletes, HasResourceRelations;

    protected $resourceRelations = ['brands', 'variants'];

    protected $fillable = ['name'];

    public function brands()
    {
        return $this->belongsTo(Brand::class);
    }

    public function variants()
    {
        return $this->hasMany(Variant::class);
    }

}
