<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Patient;
use App\Models\Practice;

class CreateContactLensRequest extends FormRequest
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
            'practice_id' =>'integer|required|exists:practices,id',
            'lens' => 'string|required',
            'brand' => 'string|required',
            'duration' => 'string|required',
            'quantity' => 'string|required',
            'price' =>  'integer|required',
            'shipping_cost' =>  'integer|required',
            'solutions' => 'string|required',
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

    public function getContactLensData()
    {
        return $this->only('lens','brand', 'duration', 'quantity', 'price', 'shipping_cost', 'solutions');
    }
}
