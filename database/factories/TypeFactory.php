<?php

use Faker\Generator as Faker;
use App\Models\Stock\Type;

$factory->define(Type::class, function (Faker $faker) {
    return [
        'name' => "{$faker->randomNumber(4)}",
        'year' => $faker->date(),
        'buy' => $faker->numberBetween(30, 200) * 100,
        'sell' => $faker->numberBetween(50, 400) * 100,
    ];
});
