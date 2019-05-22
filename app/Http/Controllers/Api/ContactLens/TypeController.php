<?php

namespace App\Http\Controllers\Api\ContactLens;

use App\Models\ContactLens\Type;
use App\Models\ContactLens\Brand;
use App\Http\Controllers\Controller;
use App\Http\Resources\ContactLens\Type as TypeResource;
use App\Http\Requests\ContactLens\CreateTypeRequest;
use App\Http\Requests\ContactLens\UpdateTypeRequest;



class TypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Brand $brand)
    {
        $types = $brand->types()->paginate(30);

        return TypeResource::collection($types);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateTypeRequest $request, Brand $brand)
    {
        $typeData = $request()->getTypeData();

        $type = $brand->types()->create($typeData);

        $type->loadResourceRelations();

        return TypeResource::make($type);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Type  $type
     * @return \Illuminate\Http\Response
     */
    public function show(Brand $brand, Type $type)
    {
        $type->loadResourceRelations();

        return TypeResource::make();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Type  $type
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTypeRequest $request, Brand $brand, Type $type)
    {
        $updates = $request ->getUpdates();

        $type->fill($updates);
        $type->save();

        $type->loadResourceRelations();

        return TypeResource::make($type);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Type  $type
     * @return \Illuminate\Http\Response
     */
    public function destroy(Brand $brand, Type $type)
    {
        $type->delete();

        return response()->json([
            'Deleted Type'
        ]);
    }

    public function restore(Brand $brand, int $type)
    {
        $type = Type::onlyTrashed()->find($type);
        $type->restore();

        return response()->json([
            'Restored Brand'
        ]);
    }
}
