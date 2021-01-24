<?php

namespace App\Http\Requests;

use App\Http\Requests\Concerns\HasOrdering;
use App\Models\ContactLens;
use App\Models\Stock\Brand;
use Illuminate\Foundation\Http\FormRequest;

class ShowBrandRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'sortTypes' => 'nullable|string|in:name,sell,buy,year',
            'orderTypes' => 'nullable|string|in:asc,desc',
        ];
    }

    public function getBrand($id): Brand
    {
        $sort = $this->input('sortTypes') ?? 'created_at';
        $order = $this->input('orderTypes') ?? 'desc';

        $brand = Brand::find($id);

        $brand->load(["types" => function ($q) use ($sort, $order) {
            $q->orderBy($sort, $order);
        }]);

        return $brand;
    }
}
