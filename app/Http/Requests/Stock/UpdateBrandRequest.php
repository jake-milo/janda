<?php

namespace App\Http\Requests\Stock;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Stock\Manufacturer;

class UpdateBrandRequest extends FormRequest
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
            'name' => 'string',
            'manufacturer_id' => 'integer|required_without:manufacturer|exists:manufacturers,id',
            'manufacturer' => 'string|required_without:manufacturer_id',
        ];
    }

    public function getUpdates()
    {
        return $this->only('name');
    }

    public function getManufacturer(): Manufacturer
    {
        if($id = $this->input('manufacturer_id')) {
            return Manufacturer::find($id);
        }

        return Manufacturer::create([
            'name' => $this->input('manufacturer'),
        ]);
    }
}
