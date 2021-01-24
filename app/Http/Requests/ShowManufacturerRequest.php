<?php

namespace App\Http\Requests;

use App\Models\Stock\Manufacturer;
use Illuminate\Foundation\Http\FormRequest;

class ShowManufacturerRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'sortBrands' => 'nullable|string|in:name,created_at,updated_at',
            'orderBrands' => 'nullable|string|in:asc,desc',
        ];
    }

    public function getManufacturer($id): Manufacturer
    {
        $manufacturer = Manufacturer::find($id);

        $sort = $this->input('sortBrands') ?? 'created_at';
        $order = $this->input('orderBrands') ?? 'desc';

        $manufacturer->load([
            'brands' => function ($q) use ($sort, $order) {
                $q->orderBy($sort, $order);
            },
        ]);

        return $manufacturer;
    }
}
