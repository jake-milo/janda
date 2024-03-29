<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Traits\HasTimestamps;

class Patient extends JsonResource
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
            'name' => $this->formatted_name,
            'title' => $this->title,
            'first_name' => $this->name,
            'last_name' => $this->last_name,
            'lab_orders' => LabOrder::collection(
                $this->whenLoaded('labOrders')
            ),
            'contact_lenses' => ContactLens::collection(
                $this->whenLoaded('contactLenses')
            ),
            'practice' => Practice::make($this->whenLoaded('practice')),
        ]);
    }
}
