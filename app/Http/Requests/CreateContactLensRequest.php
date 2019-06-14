<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Patient;
use App\Models\Practice;
use App\Models\ContactLens\Brand;
use App\Models\ContactLens\Type;

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
            'patient_id' => 'integer|required_without:patient|exists:patients,id',
            'patient' => 'string|required_without:patient_id',
            'practice_id' =>'integer|required|exists:practices,id',
            'type_id' => 'integer|required_without:type|exists:contact_lens_types,id',
            'type' => 'string|required_without:type_id',
            'duration' => 'string|required_without:type_id',
            'brand_id' => 'integer|required_without_all:type_id,brand|exists:contact_lens_brands,id',
            'brand' => 'string|required_without_all:type_id,brand_id',
            'quantity' => 'string|required',
            'price' =>  'integer|required',
            'solutions' => 'string|required',
            'right' => 'string|required',
            'left' => 'string|required',
        ];
    }

    public function getPatient()
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

    public function getType(): Type
    {
        if ($id = $this->input('type_id')){
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

        $brand = $this->input('brand');

        return Brand::create(['name' => $brand]);
    }

    public function getContactLensData()
    {
        return $this->only('lens','quantity', 'price','solutions', 'right', 'left');
    }

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
            'type_id' => 'Type',
            'quantity' => 'Quantity',
            'price' => 'Price',
            'solutions' => 'Solutions',
            'right' => 'Right',
            'left' => 'Left',
        ];
    }
}
