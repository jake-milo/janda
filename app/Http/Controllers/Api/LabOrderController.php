<?php

namespace App\Http\Controllers\Api;

use App\Models\LabOrder;
use App\Http\Controllers\Controller;
use App\Http\Resources\LabOrder as LabOrderResource;
use App\Http\Requests\CreateLabOrderRequest;
use App\Http\Requests\UpdateLabOrderRequest;

class LabOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     */
    public function index()
    {
        $labOrder = LabOrder::paginate(30);

        return LabOrderResource::collection($labOrder);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\CreateLabOrderRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateLabOrderRequest $request,)
    {
        $patient_id = $request->input('patient_id');
        $lab_id = $request->input('lab_id');
        $practice_id = $request->input('practice_id');
        $lens = $request->input('lens');
        $reference = $request->input('reference');
        $date_sent = $request->input('date_sent');
        $date_required = $request->input('date_required');

        $labOrder = LabOrder::create([
            'patient_id' => $patient_id,
            'lab_id' => $lab_id,
            'practice' => $practice_id,
            'lens' => $lens,
            'reference' => $reference,
            'date_sent' => $date_sent,
            'date_required' => $date_required,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\LabOrder  $labOrder
     * @return \Illuminate\Http\Response
     */
    public function show(LabOrder $labOrder)
    {
        $labOrder->loadResourceRelations();

        return LabOrderResource::make($labOrder);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\UpdateLabOrderRequest  $request
     * @param  \App\Models\LabOrder  $labOrder
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateLabOrderRequest $request, LabOrder $labOrder)
    {
        $patient_id = $request->input('patient_id');
        $lab_id = $request->input('lab_id');
        $practice_id = $request->input('practice_id');
        $lens = $request->input('lens');
        $reference = $request->input('reference');
        $date_sent = $request->input('date_sent');
        $date_required = $request->input('date_required');

        $labOrder->patient_id = $patient_id;
        $labOrder->lab_id = $lab_id;
        $labOrder->practice_id = $practice_id;
        $labOrder->lens = $lens;
        $labOrder->reference = $reference;
        $labOrder->date_sent = $date_sent;
        $labOrder->date_required = $date_required;
        $labOrder->save();

        $labOrder->loadResourceRelations();

        return LabOrderResource::make($labOrder);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\LabOrder  $labOrder
     * @return \Illuminate\Http\Response
     */
    public function destroy(LabOrder $labOrder)
    {
        $labOrder->delete();

        return response()->json([
            'Deleted lab order.'
        ]);
    }
}
