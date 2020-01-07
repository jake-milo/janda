<?php

namespace App\Models\Stock;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Traits\HasResourceRelations;
use Iatstuti\Database\Support\CascadeSoftDeletes;

class Brand extends Model
{
    use SoftDeletes, HasResourceRelations, CascadeSoftDeletes;

    protected $cascadeDeletes = ['types'];

    protected $resourceRelations = ['types', 'manufacturer'];

    protected $fillable = ['name'];

    public function types()
    {
        return $this->hasMany(Type::class);
    }

    public function manufacturer()
    {
        return $this->belongsTo(Manufacturer::class);
    }
}
