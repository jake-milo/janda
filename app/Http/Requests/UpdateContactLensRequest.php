<?php

namespace App\Http\Requests;

use App\Models\ContactLens\Brand;
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
            'practice_id' => 'integer|exists:practices,id',
            'type_id' => 'integer|exists:contact_lens_types,id',
            'duration' => 'string',
            'quantity' => 'string',
            'price' =>  'integer',
            'solutions' => 'string',
            'right' => 'string',
            'left' => 'string',
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
        if ($id = $this->input('type_id')) {
            return Type::find($id);
        }

        $brand = $this->getBrand();

        return $brand->types()->create([
            'name' => $this->input('type'),
            'duration' => $this->input('duration'),
        ]);
    }

    public function getBrand(): Brand
    {
        if ($id = $this->input('brand_id')) {
            return Brand::find($id);
        }

        return Brand::create([
            'name' => $this->input('brand'),
        ]);
    }

    public function getUpdates()
    {
        return $this->only('quantity', 'price', 'solutions', 'right', 'left');
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'exists' => ':attribute could not be found.'
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
            'type_id' => 'Type',
        ];
    }
}
