<?php

namespace App\Http\Controllers\Api;

use App\Models\Practice;
use App\Http\Controllers\Controller;
use App\Http\Resources\Practice as PracticeResource;
use App\Http\Requests\CreatePracticeRequest;
use App\Http\Requests\UpdatePracticeRequest;

class PracticeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $practices = Practice::paginate(30);

        return PracticeResource::collection($practices);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\CreatePracticeRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreatePracticeRequest $request)
    {
        $practiceData = $request->getPracticeData();

        $practice = Practice::create($practiceData);

        $practice->loadResourceRelations();

        return PracticeResource::make($practice);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Practice  $practice
     * @return \Illuminate\Http\Response
     */
    public function show(Practice $practice)
    {
        $practice->loadResourceRelations();

        return PracticeResource::make($practice);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\UpdatePracticeRequest  $request
     * @param  \App\Models\Practice  $practice
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePracticeRequest $request, Practice $practice)
    {
        $updates = $request->getUpdates();

        $practice->fill($updates);
        $practice->save();

        $practice->loadResourceRelations();

        return PracticeResource::make($practice);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Practice  $practice
     * @return \Illuminate\Http\Response
     */
    public function destroy(Practice $practice)
    {
        $practice->delete();

        return response()->json([
            'Deleted practice.',
        ]);
    }

    public function restore(int $practice)
    {
        $practice = Practice::onlyTrashed()->find($practice);
        $practice->restore();

        return response()->json([
            'Restored practice'
        ]);
    }
}
