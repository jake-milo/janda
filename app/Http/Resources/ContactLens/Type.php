<?php

namespace App\Http\Resources\ContactLens;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Traits\HasTimestamps;

class Type extends JsonResource
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
            'duration' => $this->duration,

            'brand' => Brand::make(
                $this->whenLoaded('brand')
            ),
        ]);


    }
}
