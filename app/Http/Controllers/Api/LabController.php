<?php

namespace App\Http\Controllers\Api;

use App\Models\Lab;
use App\Http\Controllers\Controller;
use App\Http\Requests\GetLabsRequest;
use App\Http\Requests\CreateLabRequest;
use App\Http\Requests\UpdateLabRequest;
use App\Http\Resources\Lab as LabResource;

class LabController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(GetLabsRequest $request)
    {
        $labs = $request->getLabs();
        // $labs = Lab::orderBy('name','asc')->paginate(30);

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
        $labData = $request->getLabData();

        $lab = Lab::create($labData);

        $lab->loadResourceRelations();

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
        $lab->loadResourceRelations();

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
        $updates = $request->getUpdates();

        $lab->fill($updates);
        $lab->save();

        $lab->loadResourceRelations();

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
            'Deleted lab',
        ]);
    }

    public function restore(int $lab)
    {
        $lab = Lab::onlyTrashed()->find($lab);
        $lab->restore();

        return response()->json([
            'Restored lab'
        ]);
    }
}
