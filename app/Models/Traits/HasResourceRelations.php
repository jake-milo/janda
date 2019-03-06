<?php

namespace App\Models\Traits;

trait HasResourceRelations
{
    protected function getResourceRelationsToLoad()
    {
        return defined('static::RESOURCE_RELATIONS')
            ? static::RESOURCE_RELATIONS
            : [];
    }

    public function loadResourceRelations()
    {
        $relations = $this->getResourceRelationsToLoad();

        return $this->loadMissing($relations);
    }
}
