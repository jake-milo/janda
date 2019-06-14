<?php

use Faker\Generator as Faker;
use App\Models\ContactLens\Brand;

$factory->define(App\Models\ContactLens\Type::class, function (Faker $faker) {
    $brand = Brand::inRandomOrder()->first();
    return [
        'brand_id' => optional($brand)->id,
        'name' => $faker->word." "."Vision",
        'duration' => $faker->randomElement(['daily','monthly']),
    ];
});
