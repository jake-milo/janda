<?php

use Faker\Generator as Faker;

$factory->define(App\Models\ContactLens\Brand::class, function (Faker $faker) {
    return [
        'name' => $faker->company,
    ];
});
