<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Traits\HasTimestamps;

class Practice extends JsonResource
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
            'name' => $this->name,
            'lab_orders' => LabOrder::collection(
                $this->whenLoaded('labOrders')
            ),
            'contact_lenses' => ContactLens::collection(
                $this->whenLoaded('contactLenses')
            ),
        ]);
    }
}
