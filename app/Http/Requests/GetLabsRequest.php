<?php

namespace App\Http\Requests;

use App\Models\Lab;
use Illuminate\Foundation\Http\FormRequest;

class GetLabsRequest extends FormRequest
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

    public function getLabs()
    {
        if (!$this->has('filter')) {
            return $this->getPaginatedLabs();
        }

        return $this->getFilteredLabs();
    }

    public function getPaginatedLabs()
    {
        return Lab::orderBy('name', 'asc')->paginate(30);
    }

    public function getFilteredLabs()
    {
        if ($filter = $this->input('filter')) {
            return Lab::where('name', 'LIKE', "%$filter%")->get();
        }

        return Lab::orderBy('name', 'asc')->limit(15)->get();
    }
}
