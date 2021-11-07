<?php

namespace App\Http\Requests;

use App\Models\Stock\Brand;
use App\Models\Stock\Manufacturer;
use App\Models\ContactLens\Brand as ContactLensBrand;
use App\Models\ContactLens\Type as ContactLensType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Collection;

class SearchStockRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'q' => 'string|required',
        ];
    }

    public function getBrands(): ?Collection
    {
        $q = $this->input('q');

        if (!$q) return null;

        return Brand::where('name', 'LIKE', "%$q%")->orderBy('name', 'asc')->get();
    }

    public function getManufacturers(): ?Collection
    {
        $q = $this->input('q');

        if (!$q) return null;

        return Manufacturer::where('name', 'LIKE', "%$q%")->orderBy('name', 'asc')->get();
    }

    public function getContactLensBrands(): ?Collection
    {
        $q = $this->input('q');

        if (!$q) return null;

        return ContactLensBrand::where('name', 'LIKE', "%$q%")->orderBy('name', 'asc')->get();
    }

    public function getContactLensTypes(): ?Collection
    {
        $q = $this->input('q');

        if (!$q) return null;

        return ContactLensType::where('name', 'LIKE', "%$q%")->orderBy('name', 'asc')->get();
    }
}
