<?php

namespace App\Http\Controllers\Api;

use App\Models\Type;
use App\Http\Controllers\Controller;
use App\Http\Resources\Type as TypeResource;
use App\Http\Requests\CreateTypeRequest;
use App\Http\Requests\UpdateTypeRequest;
use App\Models\Brand;
use App\Models\Variant;

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
     * @param  \App\Http\Requests\CreateTypeRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateTypeRequest $request, Brand $brand)
    {
        $typeData = $request->getTypeData();
        $type = $brand->types()->create($typeData);

        $variantData = $request->getVariants();
        $type->variants()->createMany($variantData);
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

        return TypeResource::make($type);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTypeRequest $request
     * @param  \App\Models\Type  $type
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTypeRequest $request, Brand $brand, Type $type)
    {
        $updates = $request->getUpdates();
        $type->fill($updates);
        $type->save();

        $type->variants = $type->variants->reject(function ($variant) use ($request) {
            if ($updates = $request->getVariantUpdate($variant->id)) {
                $variant->fill($updates);
                $variant->save();
                return false;
            } else {
                $variant->delete();
                return true;
            }
        });

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
            'Deleted type.',
        ]);
    }

    public function restore(Brand $brand, int $type)
    {
        $type = Type::onlyTrashed()->find($type);
        $type->restore();

        return response()->json([
            'Restored type.',
        ]);
    }
}
