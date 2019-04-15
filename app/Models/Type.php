<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Traits\HasResourceRelations;

class Type extends Model
{
    use SoftDeletes, HasResourceRelations;

    protected $resourceRelations = ['brands', 'varients'];

    protected $fillable = ['name'];

    public function Brands()
    {
        return $this->belongsTo(Brand::class);
    }

    public function Varients()
    {
        return $this->hasMany(Varient::class);
    }

}
