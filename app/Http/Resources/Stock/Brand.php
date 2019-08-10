<?php

namespace App\Http\Resources\Stock;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Traits\HasTimestamps;

class Brand extends JsonResource
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
            'name' => $this->name,

            'manufacturer' => Manufacturer::make(
                $this->whenLoaded('manufacturer')
            ),

            'types' => Type::collection(
                $this->whenLoaded('types')
            ),
        ]);
    }
}
