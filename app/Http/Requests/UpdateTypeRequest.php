<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Collection;

class UpdateTypeRequest extends FormRequest
{
    /**
     * The keyed variants.
     *
     * @var Collection
     */
    protected $keyedVariants;

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
            'name' => 'string',
            'variants' => 'array',
            'variants.*.id' => 'exists:variants',
            'variants.*.color' => 'string',
            'variants.*.price' => 'integer',
            'variants.*.year' => 'string',
        ];
    }

    public function getVariantUpdate($id)
    {
        return $this->getKeyedVariants()
                    ->get($id);
    }

    public function getUpdates()
    {
        return $this->only('name');
    }

    /**
     * Gets the keyed variants.
     *
     * @return Collection
     */
    protected function getKeyedVariants(): Collection
    {
        if (!$this->keyedVariants) {
            $variants = $this->input('variants');
            $this->keyedVariants = collect($variants)
                ->keyBy('id');
        }

        return $this->keyedVariants;
    }
}
