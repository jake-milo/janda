<?php

namespace App\Models\Stock;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Traits\HasResourceRelations;

class Variant extends Model
{
    use SoftDeletes, HasResourceRelations;

    protected $resourceRelations = ['types'];

    protected $fillable = ['color', 'price', 'year', 'quantity', 'dbl', 'eyesize', 'buy', 'sell'];

    public function types()
    {
        return $this->belongsTo(Type::class);
    }

}
