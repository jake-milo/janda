<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Traits\HasResourceRelations;

class Varient extends Model
{
    use SoftDeletes, HasResourceRelations;

    protected $resourceRelations = ['types'];

    protected $fillable = ['name'];

    public function Types()
    {
        return $this->belongsTo(Type::class);
    }

}
