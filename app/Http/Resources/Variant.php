<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Traits\HasTimestamps;

class Variant extends JsonResource
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
        return $this->withTimeStamps([
            'id' => $this->id,
            'color' => $this->color,
            'price' => $this->price,
            'year' => $this->year,

            'type' => Type::make(
                $this->whenLoaded('type')
            ),

        ]);
    }
}
