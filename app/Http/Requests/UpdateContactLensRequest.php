<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateContactLensRequest extends FormRequest
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
            'practice_id' =>'integer|exists:practices,id',
            'lens' => 'string',
            'brand' => 'string',
            'duration' => 'string',
            'quantity' => 'string',
            'price' =>  'string',
            'shipping_cost' =>  'string',
            'solutions' => 'string',
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

        return Patient::find($practiceId);
    }

    public function getUpdates()
    {
        return $this->only('lens','brand', 'duration', 'quantity', 'price', 'shipping_cost', 'solutions');
    }

}
