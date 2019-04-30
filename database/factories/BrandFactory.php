<?php

use Faker\Generator as Faker;
use App\Models\Stock\Brand;

$factory->define(Brand::class, function (Faker $faker) {
    return [
        'name' => $faker->company,
    ];
});
