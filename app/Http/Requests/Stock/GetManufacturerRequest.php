<?php

namespace App\Http\Requests\Stock;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\Concerns\HasOrdering;
use App\Models\Stock\Manufacturer;

class GetManufacturerRequest extends FormRequest
{
    use HasOrdering;

    protected $relationSorts = [];

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'sort' => 'nullable|string|in:name,created_at,updated_at',
            'order' => 'nullable|string|in:asc,desc',
        ];
    }

    public function getManufacturers()
    {
        $query = (new Manufacturer)->newQuery();
        $this->applyOrdering($query, 'name', 'asc');

        return $query->paginate(30);
    }
}

