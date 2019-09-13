<?php

namespace App\Http\Resources;

use App\Http\Resources\Traits\HasTimestamps;
use Illuminate\Http\Resources\Json\JsonResource;

class User extends JsonResource
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
            'email' => $this->email,
        ]);
    }
}
