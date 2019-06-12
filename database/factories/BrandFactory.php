<?php

use Faker\Generator as Faker;
use App\Models\Stock\Brand;
use App\Models\Stock\Manufacturer;

$factory->define(Brand::class, function (Faker $faker) {
    return [
        'manufacturer_id' => Manufacturer::inRandomOrder()->first()->id,
        'name' => $faker->company,
    ];
});
