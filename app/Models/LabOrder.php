<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasResourceRelations;
use Illuminate\Support\Facades\Date;
use Illuminate\Database\Eloquent\SoftDeletes;


class LabOrder extends Model
{
    use SoftDeletes, HasResourceRelations;

    protected $resourceRelations = ['patient', 'practice', 'lab'];

    protected $guarded = ['id', 'patient_id', 'practice_id', 'lab_id'];

    protected $dates = ['date_required', 'date_sent', 'date_received'];

    protected $with = ['practice', 'lab', 'patient'];

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

    public function scopeOverdue($query)
    {
        $today = Date::now();
        return $query->whereDate('date_required', '<=', $today)
                     ->incomplete();
    }

    public function scopeUrgent($query)
    {
        $today = Date::now();
        $twoDaysAhead = $today->addDays(2);
        return $query->whereDate('date_required', '>' , $today)
                     ->whereDate('date_required', '<=', $twoDaysAhead);
    }

    public function scopeComplete($query)
    {
        return $query->whereNotNull('date_received');
    }

    public function scopeIncomplete($query)
    {
        return $query->whereNull('date_received');
    }

    public function isOverdue(): bool
    {
        $today = Date::now();
        $dateRequired = $this->date_required;

        return $dateRequired->lt($today) && !$this->date_received;
    }

    public function isUrgent(): bool
    {
        $today = Date::now();
        $dateRequired = $this->date_required;
        $twoDaysAhead = $today->addDays(2);

        return $dateRequired->gt($today) && $dateRequired->lte($twoDaysAhead);
    }

}
