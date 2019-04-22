<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Traits\HasResourceRelations;

class Practice extends Model
{
    use SoftDeletes, HasResourceRelations;

    protected $fillable = ['name'];

    public function getResourceRelations(): array
    {
        return [
            'labOrders' => function ($q) {
                return $q->latest()->limit(10);
            },
            'contactLenses' => function ($q) {
                return $q->latest()->limit(10);
            },
        ];
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
