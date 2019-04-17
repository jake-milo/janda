<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Variant;

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
            'variants' => 'array|required',
            'variants.*.color' => 'string|required',
            'variants.*.price' => 'integer|required',
            'variants.*.year' => 'string|required',
        ];
    }

    public function getVariants()
    {
        return $this->input('variants');
    }

    public function getTypeData()
    {
        return $this->only('name');
    }
}
