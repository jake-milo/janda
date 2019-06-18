<?php

use Faker\Generator as Faker;
use App\Models\Stock\Brand;
use App\Models\Stock\Manufacturer;

$factory->define(Brand::class, function (Faker $faker) {
    $manufacturer = Manufacturer::inRandomOrder()->first();
    return [
        'manufacturer_id' => optional($manufacturer)->id,
        'name' => $faker->company,
    ];
});
