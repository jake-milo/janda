<?php

namespace App\Http\Resources\Traits;

trait HasTimestamps
{
    protected function withTimestamps(array $data)
    {
        return array_merge($data, $this->getTimestamps());
    }

    protected function getTimestamps()
    {
        return [
            $this->getTimestampKey() => [
                'created' => $this->created_at->valueOf(),
                'updated' => $this->updated_at->valueOf(),
            ],
        ];
    }

    protected function getTimestampKey()
    {
        return 'time';
    }
}
