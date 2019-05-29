<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Traits\HasTimestamps;
use App\Http\Resources\ContactLens\Type;

class ContactLens extends JsonResource
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
            'duration' => $this->duration,
            'quantity' => $this->quantity,
            'price' => $this->price,
            'shipping_cost' => $this->shipping_cost,
            'solutions' => $this->solutions,
            'Right' => $this->Right,
            'Left' => $this->Left,

            'patient' => Patient::make(
                $this->whenLoaded('patient')
            ),

            'practice' => Practice::make(
                $this->whenLoaded('practice')
            ),

            'type' => Type::make(
                $this->whenLoaded('type')
            ),
        ]);
    }
}
