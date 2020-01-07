<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Traits\HasResourceRelations;

class Lab extends Model
{
    use SoftDeletes, HasResourceRelations;

    protected $resourceRelations = ['labOrders'];

    protected $fillable = ['name'];

    public function labOrders()
    {
        return $this->hasMany(LabOrder::class);
    }
}

