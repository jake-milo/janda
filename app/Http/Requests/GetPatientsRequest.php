<?php

namespace App\Http\Requests;

use App\Models\Patient;
use Illuminate\Foundation\Http\FormRequest;

class GetPatientsRequest extends FormRequest
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
            'filter' => 'nullable|string',
        ];
    }

    public function getPatients()
    {
        if (!$this->has('filter')) {
            return $this->getPaginatedPatients();
        }

        return $this->getFilteredPatients();
    }

    public function getPaginatedPatients()
    {
        return Patient::orderBy('name', 'asc')->paginate(30);
    }

    public function getFilteredPatients()
    {
        if ($filter = $this->input('filter')) {
            return Patient::where('name', 'LIKE', "%$filter%")->get();
        }

        return Patient::orderBy('name', 'asc')->limit(15)->get();
    }
}
