<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Traits\HasResourceRelations;

class ContactLens extends Model
{
    use SoftDeletes, HasResourceRelations;

    protected $table = 'contact_lenses';

    protected $resourceRelations = ['patient', 'practice'];

    protected $guarded = ['id', 'patient_id', 'practice_id'];

    protected $with = ['practice'];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function practice()
    {
        return $this->belongsTo(Practice::class);
    }
}
