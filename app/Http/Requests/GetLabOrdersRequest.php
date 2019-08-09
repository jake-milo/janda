<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\LabOrder;
use Illuminate\Support\Facades\Date;
use Illuminate\Pagination\LengthAwarePaginator;

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
            'sort_by' => 'nullable|string',
            'order' => 'nullable|string|in:asc,dsc',
            'lab' => 'nullable|integer|exists:labs,id',
            'limit' => 'nullable|integer',
        ];
    }

    public function getLabOrders()
    {
        $sortBy = $this->input('sort_by', 'date_required');
        $order = $this->input('order', 'desc');

        $query = (new LabOrder)->newQuery()
            ->orderBy($sortBy, $order);

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
         //   : $query->paginate(30);
            : $this->paginate($query, 30);
    }


    protected function paginate($query, $perPage): LengthAwarePaginator
    {
        $total = $query->getQuery()->cloneWithout(['havings'])->count();

        $items = $query->simplePaginate($perPage)->items();

        return new LengthAwarePaginator($items, $total, $perPage);
    }
}
