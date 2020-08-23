<?php

namespace App\Http\Requests\Stock;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Collection;

class UpdateTypeRequest extends FormRequest
{
    /**
     * The keyed variants.
     *
     * @var Collection
     */
    protected $keyedVariantUpdates;

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
            'buy' => 'integer',
            'sell' => 'integer',
            'variants' => 'array',
            'variants.*.id' => 'nullable|exists:variants',
            'variants.*.color' => 'string',
            'variants.*.year' => 'string',
            'variants.*.quantity' => 'integer',
            'variants.*.eyesize' => 'string',
            'variants.*.dbl' => 'string',
            'variants.*.buy' => 'integer|nullable',
            'variants.*.sell' => 'integer|nullable',
        ];
    }

    public function getNewVariants()
    {
        return collect($this->input('variants'))->filter(function ($variant) {
            return $variant['id'] === null;
        });
    }

    public function getVariantUpdate($id)
    {
        return $this->getVariantUpdates()
            ->get($id);
    }

    public function getUpdates()
    {
        return $this->only('name', 'buy', 'sell');
    }

    /**
     * Gets the keyed variants.
     *
     * @return Collection
     */
    protected function getVariantUpdates(): Collection
    {
        if (!$this->keyedVariantUpdates) {
            $variants = $this->input('variants');
            $this->keyedVariantUpdates = collect($variants)
                ->keyBy('id');
        }

        return $this->keyedVariantUpdates;
    }
}
