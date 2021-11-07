<?php

namespace App\Http\Requests;

use App\Models\Practice;
use Illuminate\Foundation\Http\FormRequest;

class CreatePatientRequest extends FormRequest
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
            'title' => 'string|nullable',
            'name' => 'string|required',
            'last_name' => 'string|required',
            'practice_id' => 'integer|nullable|exists:practices,id',
        ];
    }

    public function getPatientData()
    {
        return $this->only('name', 'title', 'last_name');
    }

    public function getPractice(): ?Practice
    {
        $practiceId = $this->input('practice_id');

        return $practiceId ? Practice::find($practiceId) : null;
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
            'last_name' => 'Last Name',
            'practice_id' => 'Practice',
        ];
    }
}
