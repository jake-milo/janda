<?php

namespace App\Models\Stock;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Traits\HasResourceRelations;

class Manufacturer extends Model
{
    use SoftDeletes, HasResourceRelations;

    protected $resourceRelations = ['brands'];

    protected $fillable = ['name'];

    public function brands()
    {
        return $this->hasMany(Brand::class);
    }
}
