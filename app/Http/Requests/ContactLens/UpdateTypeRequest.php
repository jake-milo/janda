<?php

namespace App\Http\Requests\ContactLens;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTypeRequest extends FormRequest
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
            'duration' => 'string',
        ];
    }

    public function getUpdates()
    {
        return $this->only('name', 'duration');
    }
}
