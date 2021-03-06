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
            'quantity' => $this->quantity,
            'price' => $this->price,
            'solutions' => $this->solutions,
            'right' => $this->right,
            'left' => $this->left,

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
