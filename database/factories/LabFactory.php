<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Lab::class, function (Faker $faker) {
    return [
        'name' => $faker->company,
    ];
});
