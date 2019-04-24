<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Patient;
use App\Models\Practice;
use App\Models\Lab;

class UpdateLabOrderRequest extends FormRequest
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
            'patient_id' => 'integer|exists:patients,id',
            'practice_id' => 'integer|exists:practices,id',
            'lab_id' => 'integer|exists:labs,id',
            'lens' => 'string',
            'reference' => 'string',
            'date_sent' => 'date',
            'date_required' => 'date',
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

    public function getUpdates()
    {
        return $this->only('lens', 'reference', 'date_sent', 'date_required');
    }
}
