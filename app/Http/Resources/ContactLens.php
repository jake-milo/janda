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
            'solutions' => $this->solutions,

            'left' => [
                'type' => Type::make($this->whenLoaded('leftType')),
                'prescription' => $this->left_prescription,
                'quantity' => $this->left_quantity,
                'price' => $this->left_price,
            ],

            'right' => [
                'type' => Type::make($this->whenLoaded('rightType')),
                'prescription' => $this->right_prescription,
                'quantity' => $this->right_quantity,
                'price' => $this->right_price,
            ],

            'patient' => Patient::make(
                $this->whenLoaded('patient')
            ),

            'practice' => Practice::make(
                $this->whenLoaded('practice')
            ),
        ]);
    }
}
