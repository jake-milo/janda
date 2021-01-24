<?php

namespace App\Http\Requests;

use App\Models\Practice;
use Illuminate\Foundation\Http\FormRequest;

class ShowPracticeRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'sortLabOrders' => 'nullable|string|in:date_sent,date_required,date_received,lens',
            'orderLabOrders' => 'nullable|string|in:asc,desc',
            'sortContactLenses' => 'nullable|string|in:quantity,price,solutions',
            'orderContactLenses' => 'nullable|string|in:asc,desc',
        ];
    }

    public function getPractice($id): Practice
    {
        $practice = Practice::find($id);

        $sortLabOrders = $this->input('sortLabOrders') ?? 'date_sent';
        $orderLabOrders = $this->input('orderLabOrders') ?? 'desc';

        $sortContactLenses = $this->input('sortContactLenses') ?? 'created_at';
        $orderContactLenses = $this->input('orderContactLenses') ?? 'desc';

        $practice->load([
            'labOrders' => function ($q) use ($sortLabOrders, $orderLabOrders) {
                $q->orderBy($sortLabOrders, $orderLabOrders)->limit(10);
            },
            'contactLenses' => function ($q) use ($sortContactLenses, $orderContactLenses) {
                $q->orderBy($sortContactLenses, $orderContactLenses)->limit(10);
            },
        ]);

        return $practice;
    }
}
