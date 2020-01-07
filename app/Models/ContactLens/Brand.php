<?php

namespace App\Models\ContactLens;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Traits\HasResourceRelations;

class Brand extends Model
{
    use SoftDeletes, HasResourceRelations;

    protected $resourceRelations = ['types'];

    protected $fillable = ['name'];

    protected $table = 'contact_lens_brands';

    public function types()
    {
        return $this->hasMany(Type::class);
    }
}
