<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Traits\HasTimestamps;

class LabOrder extends JsonResource
{

    use HasTimestamps;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */

    public function toArray($request)
    {
        return $this->withTimestamps([
            'id' => $this->id,
            'lens' => $this->lens,
            'reference'=> $this->reference,
            'overdue' => $this->isOverdue(),
            'urgent' => $this->isUrgent(),
            'dates' => [
                'sent' => $this->date_sent->format('d/m/y'),
                'required' => $this->date_required->format('d/m/y'),
                'received' => optional($this->date_received)->format('d/m/y'),
            ],

            'patient' => Patient::make(
                $this->whenLoaded('patient')
            ),


            'practice' => Practice::make(
                $this->whenLoaded('practice')
            ),


            'lab' => Lab::make(
                $this->whenLoaded('lab')
            ),
        ]);
    }
}
