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
        $name = $request->input('name');

        $practice = Practice::create([
            'name' => $name,
        ]);

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
        $practice->load('labOrders', 'contactLenses')

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
        $name = $request->input('name');

        $practice->name = $name;
        $practice->save();

        $practice->load('labOrders', 'contactLenses');

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
}