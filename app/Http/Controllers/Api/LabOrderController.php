<?php

namespace App\Http\Controllers\Api;

use App\Models\LabOrder;
use App\Http\Controllers\Controller;
use App\Http\Resources\LabOrder as LabOrderResource;
use App\Http\Requests\CreateLabOrderRequest;
use App\Http\Requests\UpdateLabOrderRequest;
use App\Http\Requests\GetLabOrdersRequest;

class LabOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param GetLabOrdersRequest $request
     */
    public function index(GetLabOrdersRequest $request)
    {
        $labOrders = $request->getLabOrders();

        return LabOrderResource::collection($labOrders);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\CreateLabOrderRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateLabOrderRequest $request)
    {
        $patient = $request->getPatient();
        $practice = $request->getPractice();
        $lab = $request->getLab();

        $labOrderData = $request->getLabOrderData();

        $labOrder = new LabOrder($labOrderData);
        $labOrder->patient()->associate($patient);
        $labOrder->practice()->associate($practice);
        $labOrder->lab()->associate($lab);
        $labOrder->save();

        return LabOrderResource::make($labOrder);
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
        $patient = $request->getPatient();
        $practice = $request->getPractice();
        $lab = $request->getLab();
        $updates = $request->getUpdates();

        $labOrder->fill($updates);
        $labOrder->patient()->associate($patient);
        $labOrder->practice()->associate($practice);
        $labOrder->lab()->associate($lab);
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
            'Deleted lab order'
        ]);
    }

    public function restore(int $labOrder)
    {
        $labOrder = LabOrder::onlyTrashed()->find($labOrder);
        $labOrder->restore();

        return response()->json([
            'Restored lab order'
        ]);
    }
}
