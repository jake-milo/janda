<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Practice::class, function (Faker $faker) {
    return [
        'name' => $faker->city,
    ];
});
