<?php

namespace App\Http\Requests\Stock;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Stock\Variant;

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
            'name' => 'string|required',
            'buy' => 'integer|required',
            'sell' => 'integer|required',
            'variants' => 'array|required',
            'variants.*.color' => 'string|required',
            'variants.*.price' => 'integer|required',
            'variants.*.year' => 'string|required',
            'variants.*.quantity' => 'integer|required',
            'variants.*.eyesize' => 'string|required',
            'variants.*.dbl' => 'string|required',
        ];
    }

    public function getVariants()
    {
        return $this->input('variants');
    }

    public function getTypeData()
    {
        return $this->only('name', 'buy', 'sell');
    }

            /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'required' => ':attribute is required'
        ];
    }

        /**
     * Get custom attributes for validator errors.
     *
     * @return array
     */
    public function attributes()
    {
        return [
            'name' => 'Name',
            'buy' => 'Buy',
            'sell' => 'Sell',
            'variants' => 'Variants',
            'variants.*.color' => 'Variant color',
            'variants.*.price' => 'Variant price',
            'variants.*.year' => 'Variant year',
            'variants.*.quantity' => 'Variant quantity',
            'variants.*.eyesize' => 'Variant eyesize',
            'variants.*.dbl' => 'Variant DBL',
        ];
    }
}
