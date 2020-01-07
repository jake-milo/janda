<?php

namespace App\Models\Stock;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Traits\HasResourceRelations;
use Iatstuti\Database\Support\CascadeSoftDeletes;

class Manufacturer extends Model
{
    use SoftDeletes, HasResourceRelations, CascadeSoftDeletes;

    protected $cascadeDeletes = ['brands'];

    protected $resourceRelations = ['brands'];

    protected $fillable = ['name'];

    public function brands()
    {
        return $this->hasMany(Brand::class);
    }
}
