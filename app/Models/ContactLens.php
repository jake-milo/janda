<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactLens extends Model
{
    protected $table = 'contact_lenses';

    protected $guarded = ['id'];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function practice()
    {
        return $this->belongsTo(Practice::class);
    }
}
