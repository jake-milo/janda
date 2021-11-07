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

    protected $fillable = ['name', 'title', 'last_name'];

    protected $with = ['practice'];

    protected static function boot()
    {
        parent::boot();

        static::deleted(function ($patient) {
            $patient->labOrders()->delete();
            $patient->contactLenses()->delete();
        });
    }

    public function scopeSearch($query, $search)
    {
        $terms = explode(' ', $search);

        foreach ($terms as $term) {
            $query->orWhere('name', 'LIKE', "%$term%")
                ->orWhere('last_name', 'LIKE', "%$term%");
        }
    }

    public function practice()
    {
        return $this->belongsTo(Practice::class);
    }

    public function labOrders()
    {
        return $this->hasMany(LabOrder::class);
    }

    public function contactLenses()
    {
        return $this->hasMany(ContactLens::class);
    }

    public function getFormattedNameAttribute()
    {
        $name = $this->name;

        if ($title = $this->title) {
            $name = "$title $name";
        }

        if ($lastName = $this->last_name) {
            $name = "$lastName, $name";
        }

        return $name;
    }
}
