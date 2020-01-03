<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\ContactLens;
use App\Http\Requests\Concerns\HasOrdering;

class GetContactLensRequest extends FormRequest
{
    use HasOrdering;

    protected $relationSorts = [
        'patient' => ['patients', 'patient_id', 'name'],
        'practice' => ['practices', 'practice_id', 'name'],
        'lab' => ['labs', 'lab_id', 'name'],
        'type' => ['contact_lens_types','type_id', 'name'],
        'duration' => ['contact_lens_types', 'type_id', 'duration'],
    ];

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'practice' => 'nullable|integer|exists:practices,id',
            'sort' => 'nullable|string|in:patient,practice,type,duration,quantity,price,solutions',
            'order' => 'nullable|string|in:asc,desc',
        ];
    }

    public function getContactLenses()
    {
        $query = (new ContactLens)->newQuery();
        $this->applyOrdering($query, 'created_at');

        if ($practice = $this->input('practice')) {
            $query->where('practice_id', $practice);
        }

        return $query->paginate(30);
    }
}
