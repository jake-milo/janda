<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Patient::class, function (Faker $faker) {
    return [
        'title' => $faker->randomElement([$faker->title, null]),
        'name' => $faker->firstName,
        'last_name' => $faker->lastName,
    ];
});
