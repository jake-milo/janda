<?php

namespace App\Http\Controllers\Api;

use App\Models\Lab;
use App\Http\Controllers\Controller;
use App\Http\Resources\Lab as LabResource;
use App\Http\Requests\CreateLabRequest;
use App\Http\Requests\UpdateLabRequest;

class LabController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $labs = Lab::paginate(30);

        return LabResource::collection($labs);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\CreateLabRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateLabRequest $request)
    {
        $name = $request->input('name');

        $lab = Lab::create([
            'name' => $name,
        ]);

        return LabResource::make($lab);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Lab  $lab
     * @return \Illuminate\Http\Response
     */
    public function show(Lab $lab)
    {
        $lab = load('LabOrders');

        return LabResource::make($lab);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Request\UpdateLabRequest  $request
     * @param  \App\Models\Lab  $lab
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateLabRequest $request, Lab $lab)
    {
        $name = $request->('input');

        $lab->name = $name;
        $lab->save();

        $lab->load('LabOrders');

        return LabResource::make($lab);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Lab  $lab
     * @return \Illuminate\Http\Response
     */
    public function destroy(Lab $lab)
    {
        $lab->delete();

        return response()->json([
            'Deleted lab.',
        ]);
    }
}