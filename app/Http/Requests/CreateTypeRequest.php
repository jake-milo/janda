<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateTypeRequest extends FormRequest
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
            'brand_id' => 'integer|required|exists:brands,id',
            'name' => 'string|required',
        ];
    }

    public function getBrand(){
        $brandId = $this->input('brand_id');

        return Brand::find($brandId);
    }

    public function getTypeData()
    {

    }
}
