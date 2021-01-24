<?php

namespace App\Http\Requests;

use App\Models\Patient;
use Illuminate\Foundation\Http\FormRequest;

class ShowPatientRequest extends FormRequest
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

    public function getPatient($id): Patient
    {
        $patient = Patient::find($id);

        $sortLabOrders = $this->input('sortLabOrders') ?? 'created_at';
        $orderLabOrders = $this->input('orderLabOrders') ?? 'desc';

        $sortContactLenses = $this->input('sortContactLenses') ?? 'created_at';
        $orderContactLenses = $this->input('orderContactLenses') ?? 'desc';

        $patient->load([
            'labOrders' => function ($q) use ($sortLabOrders, $orderLabOrders) {
                $q->orderBy($sortLabOrders, $orderLabOrders);
            },
            'contactLenses' => function ($q) use ($sortContactLenses, $orderContactLenses) {
                $q->orderBy($sortContactLenses, $orderContactLenses);
            },
        ]);

        return $patient;
    }
}
