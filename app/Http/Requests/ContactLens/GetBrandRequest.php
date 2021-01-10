<?php

namespace App\Http\Requests\ContactLens;

use App\Models\ContactLens\Brand;
use Illuminate\Foundation\Http\FormRequest;

class GetBrandRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'filter' => 'nullable|string',
            'include' => 'nullable|string|exists:contact_lens_brands,id',
        ];
    }

    public function getBrands()
    {
        if (!$this->has('filter')) {
            return $this->getPaginatedBrands();
        }

        return $this->getFilteredBrands();
    }

    public function getPaginatedBrands()
    {
        return Brand::orderBy('name', 'asc')->paginate(30);
    }

    public function getFilteredBrands()
    {
        $query = (new Brand)->newQuery();

        if ($filter = $this->input('filter')) {
            $query->where('name', 'LIKE', "%$filter%");
        } else {
            $query->limit(15)->orderBy('name', 'asc');
        }

        $results = $query->get();

        if ($include = $this->input('include')) {
            if (!$results->contains('id', $include)) {
                $includedBrand = Brand::find($include);

                $results->prepend($includedBrand);
            }
        }

        return $results;
    }
}
