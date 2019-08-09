<?php

namespace App\Exceptions;

use Exception;

class HasOrderingRequirementsMissingException extends Exception
{
    public function __construct()
    {
        parent::__construct('HasOrdering requires the $relationSorts array');
    }
}
