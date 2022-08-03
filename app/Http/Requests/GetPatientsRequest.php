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
            'sort' => 'nullable|string|in:last_name,created_at,updated_at',
            'order' => 'nullable|string|in:asc,desc',
            'include' => 'nullable|string|exists:patients,id',
        ];
    }

    public function getPatients()
    {
        if ($this->has('filter')) {
            return $this->filteredPatients();
        }

        $query = (new Patient)->newQuery();
        $this->applyOrdering($query, 'last_name', 'asc');
        $query->orderBy('name', $this->input('order') ?? 'asc');

        return $query->paginate(30);
    }

    public function filteredPatients()
    {
        $query = (new Patient)->newQuery();

        if ($filter = $this->input('filter')) {
            $query->search($filter)->orderBy('last_name', 'asc')->orderBy('name', 'asc');
            // $query->whereRaw("CONCAT(title, ' ', name, ' ', last_name) LIKE '%$filter%'");
        } else {
            $query->limit(15)->orderBy('last_name', 'asc')->orderBy('name', 'asc');
        }

        $results = $query->get();

        if ($include = $this->input('include')) {
            if (!$results->contains('id', $include)) {
                $includedPatient = Patient::find($include);

                $results->prepend($includedPatient);
            }
        }

        return $results;
    }
}
