<?php

namespace App\Http\Requests\Stock;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Stock\Variant;
use Carbon\Carbon;

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
            'year' => 'string|required',
            'variants' => 'array|required',
            'variants.*.color' => 'string|required',
            'variants.*.year' => 'string|nullable',
            'variants.*.quantity' => 'integer|required',
            'variants.*.eyesize' => 'string|required',
            'variants.*.dbl' => 'string|required',
            'variants.*.buy' => 'integer|nullable',
            'variants.*.sell' => 'integer|nullable',
        ];
    }

    public function getVariants()
    {
        return $this->input('variants');
    }

    public function getTypeData()
    {
        $data = $this->only('name', 'buy', 'sell', 'year');

        $data['year'] = new Carbon($data['year']);

        return $data;
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
            'year' => 'Year',
            'variants' => 'Variants',
            'variants.*.color' => 'Variant color',
            'variants.*.year' => 'Variant year',
            'variants.*.quantity' => 'Variant quantity',
            'variants.*.eyesize' => 'Variant eyesize',
            'variants.*.dbl' => 'Variant DBL',
        ];
    }
}
