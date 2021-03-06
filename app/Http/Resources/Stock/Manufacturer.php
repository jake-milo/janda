<?php

namespace App\Http\Resources\Stock;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Traits\HasTimestamps;

class Manufacturer extends JsonResource
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

            'brands' => Brand::collection(
                $this->whenLoaded('brands')
            ),
        ]);
    }
}
