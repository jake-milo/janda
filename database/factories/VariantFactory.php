<?php

use Faker\Generator as Faker;
use App\Models\Variant;

$factory->define(Variant::class, function (Faker $faker) {
    return [
        'color' => $faker->colorName,
        'price' => $faker->numberBetween(100, 300) * 100,
        'year' => $faker->year(),
    ];
});
