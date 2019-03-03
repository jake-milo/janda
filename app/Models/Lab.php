<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lab extends Model
{
    protected $fillable = ['name'];

    public function labOrders()
    {
        return $this->hasMany(LabOrder::class);
    }
}

