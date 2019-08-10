<?php

namespace App\Http\Requests;

use App\Models\Lab;
use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\Concerns\HasOrdering;

class GetLabsRequest extends FormRequest
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
            'sort' => 'nullable|string|in:name,created_at,updated_at',
            'order' => 'nullable|string|in:asc,desc',
        ];
    }

    public function getLabs()
    {
        if ($this->has('filter')) {
            return $this->filteredLabs();
        }

        $query = (new Lab)->newQuery();
        $this->applyOrdering($query, 'name', 'asc');

        return $query->paginate(30);
    }


    public function filteredLabs()
    {
        $query = (new Lab)->newQuery();

        if ($filter = $this->input('filter')) {
            $query->where('name', 'LIKE', "%$filter%");
        } else {
            $query->limit(15)->orderBy('name', 'asc');
        }

        return $query->get();
    }
}
