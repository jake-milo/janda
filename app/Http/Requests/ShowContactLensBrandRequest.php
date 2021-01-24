<?php

namespace App\Http\Requests;

use App\Models\ContactLens\Brand;
use Illuminate\Foundation\Http\FormRequest;

class ShowContactLensBrandRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'sortTypes' => 'nullable|string|in:name,duration',
            'orderTypes' => 'nullable|string|in:asc,desc',
        ];
    }

    public function getBrand($id): Brand
    {
        $brand = Brand::find($id);

        $sort = $this->input('sortTypes') ?? 'name';
        $order = $this->input('orderTypes') ?? 'asc';

        $brand->load([
            'types' => function ($q) use ($sort, $order) {
                $q->orderBy($sort, $order);
            }
        ]);

        return $brand;
    }
}
