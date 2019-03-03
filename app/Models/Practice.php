<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Practice extends Model
{
    protected $fillable = ['name'];

    public function labOrders()
    {
        return $this->hasMany(LabOrder::class);
    }

    public function contactLenses()
    {
        return $this->hasMany(ContactLens::class);
    }
}
