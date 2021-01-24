<?php

namespace App\Http\Controllers\Api\Stock;

use App\Models\Stock\Manufacturer;
use App\Http\Controllers\Controller;
use App\Http\Requests\ShowManufacturerRequest;
use App\Http\Resources\Stock\Manufacturer as ManufacturerResource;
use App\Http\Requests\Stock\CreateManufacturerRequest;
use App\Http\Requests\Stock\UpdateManufacturerRequest;
use App\Http\Requests\Stock\GetManufacturerRequest;

class ManufacturerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(GetManufacturerRequest $request)
    {
        $manufacturer = $request->getManufacturers();

        return ManufacturerResource::collection($manufacturer);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateManufacturerRequest $request)
    {
        $manufacturerData = $request->getManufacturerData();

        $manufacturer = Manufacturer::create($manufacturerData);

        $manufacturer->loadResourceRelations();

        return ManufacturerResource::make($manufacturer);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Manufacturer  $manufacturer
     * @return \Illuminate\Http\Response
     */
    public function show(ShowManufacturerRequest $request, $id)
    {
        $manufacturer = $request->getManufacturer($id);
        $manufacturer->loadResourceRelations();

        return ManufacturerResource::make($manufacturer);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Manufacturer  $manufacturer
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateManufacturerRequest $request, Manufacturer $manufacturer)
    {
        $updates = $request->getUpdates();

        $manufacturer->fill($updates);
        $manufacturer->save();

        $manufacturer->loadResourceRelations();

        return ManufacturerResource::make($manufacturer);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Manufacturer  $manufacturer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Manufacturer $manufacturer)
    {
        $manufacturer->delete();

        return response()->json([
            'Deleted Manufacturer',
        ]);
    }

    public function restore(int $manufacturer)
    {
        $manufacturer = Manufacturer::onlyTrashed()->find($manufacturer);
        $manufacturer->restore();

        return response()->json([
            'Restored Manufacturer',
        ]);
    }
}
