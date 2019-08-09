<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\LabOrder;
use App\Http\Requests\Concerns\HasOrdering;

class GetLabOrdersRequest extends FormRequest
{
    use HasOrdering;

    protected $relationSorts = [
        'patient' => ['patients', 'patient_id', 'name'],
        'practice' => ['practices', 'practice_id', 'name'],
        'lab' => ['labs', 'lab_id', 'name'],
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
            'status' => 'nullable|string|in:overdue,urgent,complete,incomplete',
            'sort' => 'nullable|string|in:date_sent,date_received,date_required,lens,lab,practice,patient',
            'order' => 'nullable|string|in:asc,desc',
            'lab' => 'nullable|integer|exists:labs,id',
            'limit' => 'nullable|integer',
        ];
    }

    public function getLabOrders()
    {
        $query = (new LabOrder)->newQuery();
        $this->applyOrdering($query, 'date_required');

        if ($practice = $this->input('practice')) {
            $query->where('practice_id', $practice);
        }

        if ($status = $this->input('status')) {
            $query->$status();
        }

        if ($lab = $this->input('lab')) {
            $query->where('lab_id', $lab);
        }

        $limit = $this->input('limit');

        return $limit
            ? $query->limit($limit)->get()
            : $query->paginate(30);
    }

}
