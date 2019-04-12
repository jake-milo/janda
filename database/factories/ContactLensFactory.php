<?php

use Faker\Generator as Faker;
use App\Models\ContactLens;
use App\Models\Practice;
use App\Models\Patient;


$factory->define(Model::class, function (Faker $faker) {
    return [
        'patient_id' => Patient::inRandomOrder()->first()->id,
        'practice_id' => Practice::inRandomOrder()->first()->id,
        'lens' => $faker->colorName, //color name is similar to real data
        'brand' => $faker->company,
        'duration'
        'quantity'
        'price'
        'shipping_cost'
        'solutions'
    ];
});
