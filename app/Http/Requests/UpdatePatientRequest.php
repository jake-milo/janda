<?php

namespace App\Http\Requests;

use App\Models\Practice;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePatientRequest extends FormRequest
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

    public function getUpdates()
    {
        return $this->only('name', 'title', 'last_name');
    }

    public function getPractice(): ?Practice
    {
        $practiceId = $this->input('practice_id');

        return $practiceId ? Practice::find($practiceId) : null;
    }
}
