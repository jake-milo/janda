<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasResourceRelations;

class LabOrder extends Model
{
    use HasResourceRelations;

    protected $resourceRelations = ['patient', 'practice', 'lab'];

    protected $guarded = ['id', 'patient_id', 'practice_id', 'lab_id'];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function practice()
    {
        return $this->belongsTo(Practice::class);
    }

    public function lab()
    {
        return $this->belongsTo(Lab::class);
    }

}
