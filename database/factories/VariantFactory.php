<?php

use Faker\Generator as Faker;
use App\Models\Stock\Variant;

$factory->define(Variant::class, function (Faker $faker) {
    return [
        'color' => $faker->colorName,
        'price' => $faker->numberBetween(100, 300) * 100,
        'year' => $faker->year(),
        'quantity' => $faker->numberBetween(1, 100),
        'eyesize' => $faker->numberBetween(20,60) . 'mm',
        'dbl' => $faker->numberBetween(5,50) . 'mm',
    ];
});
