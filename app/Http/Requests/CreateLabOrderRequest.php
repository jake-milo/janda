<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateLabOrderRequest extends FormRequest
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
            'patient_id' => 'integer|required|exists:patients,id',
            'practice_id' => 'integer|required|exists:practices,id',
            'lab_id' => 'integer|required|exists:labs,id',
            'lens' => 'string|required',
            'reference' => 'string|required',
            'date_sent' => 'date|required',
            'date_required' => 'date|required',
        ];
    }

    public function getPatient()
    {
        $patientId = $this->input('patient_id');

        return Patient::find($patientId);
    }

    public function getPractice()
    {
        $practiceId = $this->input('practice_id');

        return Practice::find($practiceId);
    }

    public function getLab()
    {
        $labId = $this->input('lab_id');

        return Lab::find($labId);
    }

    public function getLabOrderData()
    {
        return $this->only('lens', 'reference', 'date_sent', 'date_required');
    }
}
