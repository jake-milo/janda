<?php

namespace App\Http\Controllers\Api\ContactLens;

use App\Models\ContactLens\Brand;
use App\Http\Controllers\Controller;
use App\Http\Resources\ContactLens\Brand as BrandResource;
use App\Http\Requests\ContactLens\CreateBrandRequest;
use App\Http\Requests\ContactLens\UpdateBrandRequest;
use App\Http\Requests\ContactLens\GetBrandRequest;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(GetBrandRequest $request)
    {
        $brand = $request->getBrands();

        return BrandResource::collection($brand);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateBrandRequest $request)
    {
        $brandData = $request->getBrandData();

        $brand = Brand::create($brandData);

        $brand->loadResourceRelations();

        return BrandResource::make($brand);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function show(Brand $brand)
    {
        $brand->loadResourceRelations();

        return BrandResource::make();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateBrandRequest $request, Brand $brand)
    {
        $updates = $request->getUpdates();

        $brand->fill($updates);
        $brand->save();

        $brand->loadResourceRelations();

        return BrandResource::make($brand);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function destroy(Brand $brand)
    {
        $brand->delete();

        return response()->json([
            'Deleted Brand'
        ]);
    }

    public function restore(int $brand)
    {
        $brand = Brand::onlyTrashed()->find($brand);
        $brand->restore();

        return response()->json([
            'Restored Brand'
        ]);
    }
}
