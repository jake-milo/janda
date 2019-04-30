<?php

use Faker\Generator as Faker;
use App\Models\Stock\Type;

$factory->define(Type::class, function (Faker $faker) {
    return [
        'name' => "{$faker->randomNumber(4)}",
    ];
});
