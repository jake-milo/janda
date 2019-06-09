<?php

use Faker\Generator as Faker;
use App\Models\ContactLens\Brand;

$factory->define(App\Models\ContactLens\Type::class, function (Faker $faker) {
    return [
        'brand_id' => Brand::inRandomOrder()->first()->id,
        'name' => $faker->word." "."Vision",
        'duration' => $faker->randomElement(['daily','monthly']),
    ];
});
