<?php

namespace App\Http\Controllers\Api;

use App\Models\ContactLens;
use App\Http\Controllers\Controller;
use App\Http\Resources\ContactLens as ContactLensResource;
use App\Http\Requests\CreateContactLensRequest;
use App\Http\Requests\UpdateContactLensRequest;

class ContactLensController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $contactLenses = ContactLens::paginate(30);

        return ContactLensResource::collection($contactLenses);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\CreateContactLensRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateContactLensRequest $request)
    {
        $patient = $request->getPatient();
        $practice = $request->getPractice();

        $contactLensData = $request->getContactLensData();

        $contactLens = new ContactLens($contactLensData);
        $contactLens->patient()->associate($patient);
        $contactLens->practice()->associate($practice);
        $contactLens->save();

        return ContactLensResource::make($contactLens);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ContactLens  $contactLens
     * @return \Illuminate\Http\Response
     */
    public function show(ContactLens $contactLens)
    {
        $contactLens->loadResourceRelations();

        return ContactLensResource::make($contactLens);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateContactLensRequest  $request
     * @param  \App\Models\ContactLens  $contactLens
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateContactLensRequest $request, ContactLens $contactLens)
    {
        $patient = $request->getPatient();
        $practice = $request->getPractice();
        $updates = $request->getUpdates();

        $contactLens->fill($updates);
        $contactLens->patient()->associate($patient);
        $contactLens->practice()->associate($practice);
        $contactLens->save();

        $contactLens->loadResourceRelations();

        return ContactLensResource::make($contactLens);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ContactLens  $contactLens
     * @return \Illuminate\Http\Response
     */
    public function destroy(ContactLens $contactLens)
    {
        $contactLens->delete();

        return response()->json([
            'Deleted contact lens.'
        ]);
    }
}
