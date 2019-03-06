<?php

namespace App\Models\Traits;

trait HasResourceRelations
{
    protected function getResourceRelationsToLoad()
    {
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
