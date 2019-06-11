<?php

namespace App\Http\Controllers\Api\Stock;

use App\Models\Stock\Brand;
use App\Http\Controllers\Controller;
use App\Http\Resources\Stock\Brand as BrandResource;
use App\Http\Requests\Stock\CreateBrandRequest;
use App\Http\Requests\Stock\UpdateBrandRequest;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $brands = Brand::orderBy('name')->get();

        return BrandResource::collection($brands);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\CreateBrandrequest  $request
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

        return BrandResource::make($brand);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateBrandRequest  $request
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
            'Deleted brand',
        ]);
    }

    public function restore(int $brand)
    {
        $brand = Brand::onlyTrashed()->find($brand);
        $brand->restore();

        return response()->json([
            'Restored brand',
        ]);
    }
}
