<?php

namespace App\Http\Controllers\Api;

use App\Models\Patient;
use App\Http\Controllers\Controller;
use App\Http\Resources\Patient as PatientResource;
use App\Http\Requests\CreatePatientRequest;
use App\Http\Requests\UpdatePatientRequest;
use App\Http\Requests\GetPatientsRequest;
use App\Http\Requests\ShowPatientRequest;

class PatientController extends Controller
{
    /**
     * Shows all patients, paginated.
     */
    public function index(GetPatientsRequest $request)
    {
        $patients = $request->getPatients();

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
        $patientData = $request->getPatientData();

        $patient = Patient::create($patientData);

        $patient->loadResourceRelations();

        return PatientResource::make($patient);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Patient  $patient
     * @return \Illuminate\Http\Response
     */
    public function show(ShowPatientRequest $request, $id)
    {
        $patient = $request->getPatient($id);
        $patient->loadResourceRelations();

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
        $patientData = $request->getUpdates();

        $patient->fill($patientData);
        $patient->save();

        $patient->loadResourceRelations();
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
            'Deleted patient',
        ]);
    }

    public function restore(int $patient)
    {
        $patient = Patient::onlyTrashed()->find($patient);
        $patient->restore();

        return response()->json([
            'Restored patient'
        ]);
    }
}
