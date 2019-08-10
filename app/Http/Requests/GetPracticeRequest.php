<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\Concerns\HasOrdering;
use App\Models\Practice;

class GetPracticeRequest extends FormRequest
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
            'sort' => 'nullable|string|in:name,created_at,updated_at',
            'order' => 'nullable|string|in:asc,desc',
        ];
    }

    public function getPractices()
    {
        $query = (new Practice)->newQuery();
        $this->applyOrdering($query, 'name', 'asc');

        return $query->get();
    }

}
