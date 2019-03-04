<?php

namespace App\Http\Controllers\Api;

use App\Models\Patient;
use App\Http\Controllers\Controller;
use App\Http\Resources\Patient as PatientResource;
use App\Http\Requests\CreatePatientRequest;

class PatientController extends Controller
{
    /**
     * Shows all patients, paginated.
     */
    public function index()
    {
        $patients = Patient::paginate(30);

        return PatientResource::collection($patients);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\CreatePatientRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreatePatientRequest $request)
    {
        $name = $request->input('name');

        $patient = Patient::create([
            'name' => $name,
        ]);

        return PatientResource::make($patient);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Patient  $patient
     * @return \Illuminate\Http\Response
     */
    public function show(Patient $patient)
    {
        $patient->load('labOrders', 'contactLenses');

        return PatientResource::make($patient);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePatientRequest  $request
     * @param  \App\Models\Patient  $patient
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePatientRequest $request, Patient $patient)
    {
        $name = $request->input('name');

        $patient->name = $name;
        $patient->save();

        $patient->load('labOrders', 'contactLenses');

        return PatientResource::make($patient);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Patient  $patient
     * @return \Illuminate\Http\Response
     */
    public function destroy(Patient $patient)
    {
        $patient->delete();

        return response()->json([
            'Deleted patient.',
        ]);
    }
}
