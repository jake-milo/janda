<?php

namespace App\Models\ContactLens;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Traits\HasResourceRelations;

class Type extends Model
{
    use HasResourceRelations, SoftDeletes;

    protected $fillable = ['name'];

    protected $table = 'contact_lens_types';

    public function contactLenses()
    {
        return $this->hasMany(ContactLens::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }
}
