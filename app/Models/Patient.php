<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Traits\HasResourceRelations;
use Illuminate\Support\Facades\Date;

class Patient extends Model
{
    use SoftDeletes, HasResourceRelations;

    protected $resourceRelations = ['labOrders', 'contactLenses'];

    protected $fillable = ['name'];

    protected static function boot()
    {
        parent::boot();

        static::deleted(function ($patient) {
            $patient->labOrders()->delete();
            $patient->contactLenses()->delete();
        });
    }


    public function labOrders()
    {
        return $this->hasMany(LabOrder::class);
    }

    public function contactLenses()
    {
        return $this->hasMany(ContactLens::class);
    }
}
