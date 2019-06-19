<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Patient;
use App\Models\Practice;
use App\Models\Lab;

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
            'patient_id' => 'integer|required_without:patient|exists:patients,id',
            'patient' => 'string|required_without:patient_id',
            'practice_id' => 'integer|required|exists:practices,id',
            'lab_id' => 'integer|required_without:lab|exists:labs,id',
            'lab' => 'string|required_without:lab_id',
            'lens' => 'string|required',
            'reference' => 'string|required',
            'date_sent' => 'date|required',
            'date_required' => 'date|required',
            'date_received' => 'date|nullable',
        ];
    }

    public function getPatient(): Patient
    {
        if ($id = $this->input('patient_id')) {
            return Patient::find($id);
        }

        return Patient::create([
            'name' => $this->input('patient'),
        ]);
    }

    public function getPractice(): Practice
    {
        $practiceId = $this->input('practice_id');

        return Practice::find($practiceId);
    }

    public function getLab(): Lab
    {
        if ($id = $this->input('lab_id')) {
            return Lab::find($id);
        }

        return Lab::create([
            'name' => $this->input('lab'),
        ]);
    }

    public function getLabOrderData(): array
    {
        return $this->only('lens', 'reference', 'date_sent', 'date_required', 'date_received');
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'required' => ':attribute is required.',
            'exists' => ':attribute could not be found.',
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
            'patient_id' => 'Patient',
            'practice_id' => 'Practice',
            'lab_id' => 'Lab',
            'lens' => 'Lens',
            'reference' => 'Reference',
            'date_sent' => 'Date sent',
            'date_required' => 'Date required',
            'date_received' => 'Date received',
        ];
    }
}
