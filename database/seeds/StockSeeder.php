<?php

use Illuminate\Database\Seeder;
use App\Models\Stock\Brand;
use App\Models\Stock\Type;
use App\Models\Stock\Variant;
use App\Models\Stock\Manufacturer;

class StockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Manufacturer::class, 20)
            ->create()
            ->each(function ($manufacturer) {
                $manufacturer->brands()
                    ->saveMany(factory(Brand::class, 3)->make())
                    ->each(function ($brand) {
                        $brand->types()
                            ->saveMany(factory(Type::class, 10)->make())
                            ->each(function ($type) {
                                $type->variants()
                                    ->saveMany(
                                        factory(Variant::class, rand(1, 4))
                                            ->make()
                                    );
                            });
                    });
            });
    }
}
