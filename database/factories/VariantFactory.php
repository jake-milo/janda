<?php

use Faker\Generator as Faker;
use App\Models\Stock\Variant;

$factory->define(Variant::class, function (Faker $faker) {

    $buy = $faker->numberBetween(30, 200) * 100;
    $sell = $faker->numberBetween(30, 200) * 100;

    return [
        'color' => $faker->colorName,
        'year' => $faker->year(),
        'quantity' => $faker->numberBetween(1, 100),
        'eyesize' => $faker->numberBetween(20, 60) . 'mm',
        'dbl' => $faker->numberBetween(5, 50) . 'mm',
        'buy' => $faker->randomElement([$buy, null]),
        'sell' => $faker->randomElement([$sell, null]),
    ];
});
