<?php

use Illuminate\Database\Seeder;
use App\Models\Brand;
use App\Models\Type;
use App\Models\Variant;

class StockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Brand::class, 150)
            ->create()
            ->each(function ($brand) {
                $brand->types()
                    ->saveMany(factory(Type::class, 20)->make())
                    ->each(function ($type) {
                        $type->variants()
                            ->saveMany(
                                factory(Variant::class, rand(1,5))
                                    ->make()
                            );
                    });
            });
    }
}