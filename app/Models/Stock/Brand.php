<?php

namespace App\Models\Stock;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Traits\HasResourceRelations;

class Brand extends Model
{
    use SoftDeletes, HasResourceRelations;

    protected $resourceRelations = ['types'];

    protected $fillable = ['name'];

    public function types()
    {
        return $this->hasMany(Type::class);
    }
}
