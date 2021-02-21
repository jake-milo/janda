<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Traits\HasResourceRelations;
use App\Models\ContactLens\Type;

class ContactLens extends Model
{
    use SoftDeletes, HasResourceRelations;

    protected $table = 'contact_lenses';

    protected $resourceRelations = ['patient', 'practice', 'leftType', 'rightType'];

    protected $guarded = ['id', 'patient_id', 'practice_id'];

    protected $with = ['practice', 'patient', 'leftType', 'rightType'];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function practice()
    {
        return $this->belongsTo(Practice::class);
    }

    public function leftType()
    {
        return $this->belongsTo(Type::class, 'left_type_id');
    }

    public function rightType()
    {
        return $this->belongsTo(Type::class, 'right_type_id');
    }
}
