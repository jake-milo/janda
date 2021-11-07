<?php

namespace App\Http\Controllers\Api\Stock;

use App\Http\Controllers\Controller;
use App\Http\Requests\SearchStockRequest;
use App\Http\Resources\ContactLens\Brand as ContactLensBrand;
use App\Http\Resources\ContactLens\Type as ContactLensType;
use App\Http\Resources\Stock\Brand;
use App\Http\Resources\Stock\Manufacturer;

class SearchController extends Controller
{
    public function __invoke(SearchStockRequest $request)
    {
        return response()->json([
            'brands' => Brand::collection($request->getBrands()),
            'manufacturers' => Manufacturer::collection($request->getManufacturers()),
            'contact_lens_brands' =>  ContactLensBrand::collection($request->getContactLensBrands()),
            'contact_lens_types' => ContactLensType::collection($request->getContactLensTypes()),
        ]);
    }
}
