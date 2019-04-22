<?php

namespace App\Models\Traits;

trait HasResourceRelations
{
    protected function getResourceRelationsToLoad()
    {
        if (method_exists($this, 'getResourceRelations')) {
            return $this->getResourceRelations();
        }

        return isset($this->resourceRelations)
            ? $this->resourceRelations
            : [];
    }

    public function loadResourceRelations()
    {
        $relations = $this->getResourceRelationsToLoad();

        return $this->loadMissing($relations);
    }
}
