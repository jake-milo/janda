<?php

namespace App\Http\Requests;

use App\Models\Patient;
use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\Concerns\HasOrdering;

class GetPatientsRequest extends FormRequest
{
    use HasOrdering;

    protected $relationSorts = [];

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'filter' => 'nullable|string',
            'sort' => 'nullable|string|in:name',
            'order' => 'nullable|string|in:asc,desc',
        ];
    }

    public function getPatients()
    {
        if ($this->has('filter')) {
            return $this->filteredPatients();
        }

        $query = (new Patient)->newQuery();
        $this->applyOrdering($query, 'name', 'asc');

        return $query->paginate(30);
    }

    public function filteredPatients()
    {
        $query = (new Patient)->newQuery();

        if ($filter = $this->input('filter')) {
            $query->where('name', 'LIKE', "%$filter%");
        } else {
            $query->limit(15)->orderBy('name', 'asc');
        }

        return $query->get();
    }
}
