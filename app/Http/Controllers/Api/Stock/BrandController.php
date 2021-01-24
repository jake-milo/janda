<?php

namespace App\Http\Controllers\Api\Stock;

use App\Models\Stock\Brand;
use App\Http\Controllers\Controller;
use App\Http\Requests\ShowBrandRequest;
use App\Http\Resources\Stock\Brand as BrandResource;
use App\Http\Requests\Stock\CreateBrandRequest;
use App\Http\Requests\Stock\UpdateBrandRequest;
use App\Http\Resources\Stock\Variant as VariantResource;
use App\Models\Stock\Variant;
use Illuminate\Http\Request;

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
        $manufacturer = $request->getManufacturer();
        $brandData = $request->getBrandData();

        $brand = new Brand($brandData);
        $brand->manufacturer()->associate($manufacturer);
        $brand->save();

        return BrandResource::make($brand);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function show(ShowBrandRequest $request, $id)
    {
        $brand = $request->getBrand($id);
        $brand->loadResourceRelations();

        // dd($brand);

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
        $manufacturer = $request->getManufacturer();

        $brand->fill($updates);
        $brand->manufacturer()->associate($manufacturer);
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

    public function showVariant(Variant $variant)
    {
        $variant->loadResourceRelations();

        return VariantResource::make($variant);
    }

    public function updateVariantQuantity(Request $request, Variant $variant)
    {
        if ($quantity = $request->input('quantity')) {
            $variant->quantity = $quantity;
            $variant->save();
        }

        return response()->json([
            'Updated quantity.',
        ]);
    }
}
