<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Patient;
use App\Models\Practice;
use App\Models\ContactLens\Type;

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
            'type_id' =>'integer|exists:contact_lens_types,id',
            'lens' => 'string',
            'duration' => 'string',
            'quantity' => 'string',
            'price' =>  'integer',
            'shipping_cost' =>  'integer',
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

        return Practice::find($practiceId);
    }

    public function getType()
    {
        $typeId = $this->input('type_id');

        return Type::find($typeId);
    }

    public function getUpdates()
    {
        return $this->only('lens', 'duration', 'quantity', 'price', 'shipping_cost', 'solutions');
    }

}
