<?php

use Faker\Generator as Faker;
use App\Models\Stock\Manufacturer;

$factory->define(Manufacturer::class, function (Faker $faker) {
    return [
        'name' => $faker->company,
    ];
});
