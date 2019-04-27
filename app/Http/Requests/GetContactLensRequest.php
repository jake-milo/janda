<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\ContactLens;

class GetContactLensRequest extends FormRequest
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
        ];
    }

    public function getContactLenses()
    {
        $query = (new ContactLens)->newQuery();

        if ($practice = $this->input('practice')) {
            $query->where('practice_id', $practice);
        }

        return $query->paginate(30);
    }
}
