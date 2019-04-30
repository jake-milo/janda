<?php

namespace App\Models\ContactLens;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Traits\HasResourceRelations;

class Brand extends Model
{
    use HasResourceRelations, SoftDeletes;

    protected $fillable = ['name'];

    protected $table = 'contact_lens_brands';

    function contactLens()
    {
        return $this->belongsTo(ContactLens::class);
    }
}
