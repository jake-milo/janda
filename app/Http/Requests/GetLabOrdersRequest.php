<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\LabOrder;

class GetLabOrdersRequest extends FormRequest
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
            'practice' => 'nullable|integer|exists:practices,id',
            'status' => 'nullable|string|in:overdue,urgent,complete,incomplete',
            'lab' => 'nullable|integer|exists:labs,id',
            'limit' => 'nullable|integer',
        ];
    }

    public function getLabOrders()
    {
        $query = (new LabOrder)->newQuery();

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
