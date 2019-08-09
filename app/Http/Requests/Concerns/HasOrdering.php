<?php

namespace App\Http\Requests\Concerns;

use App\Exceptions\HasOrderingRequirementsMissingException as Exception;

trait HasOrdering
{
    protected function applyOrdering($query, $defaultSort, $defaultOrder = 'desc')
    {
        throw_unless(
            property_exists($this, 'relationSorts'),
            Exception::class
        );

        $sort = $this->input('sort') ?? $defaultSort;
        $order = $this->input('order') ?? $defaultOrder;

        if (array_key_exists($sort, $this->relationSorts)) {
            $this->applyRelationalSort(
                $query,
                $this->relationSorts[$sort],
                $order
            );
        } else {
            $query->orderBy($sort, $order);
        }
    }

    protected function applyRelationalSort($query, $config, $order)
    {
        [$table, $column, $orderOn] = $config;
        $localTable = $query->getQuery()->from;

        $query->select("$localTable.*")
            ->join($table, "$table.id", '=', "$localTable.$column")
            ->orderBy("$table.$orderOn", $order);
    }


}
