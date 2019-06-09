<?php

namespace App\Http\Requests;

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
        ];
    }

    public function getBrands()
    {
        if (!$this->has('filter')){
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
        if($filter = $this->input('filter')) {
            return Brand::where('name', 'LIKE', "%$filter%")->get();
        }

        return Brand::orderBy('name', 'asc')->limit(15)->get();
    }
}
