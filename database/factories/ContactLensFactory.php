<?php

use Faker\Generator as Faker;
use App\Models\ContactLens;
use App\Models\Practice;
use App\Models\Patient;
use App\Models\ContactLens\Type;

$factory->define(ContactLens::class, function (Faker $faker) {
    return [
        'patient_id' => Patient::inRandomOrder()->first()->id,
        'practice_id' => Practice::inRandomOrder()->first()->id,
        'type_id' => Type::inRandomOrder()->first()->id,
        'lens' => $faker->colorName, //color name is similar to real data
        'duration' => $faker->randomElement(['daily','monthly']),
        'quantity' => $faker->numberBetween(1, 9) . ' months',
        'price' => $faker->numberBetween(30, 200) * 100,
        'shipping_cost' => $faker->numberBetween(10, 40) * 100,
        'solutions' => $faker->word,
        'right' => '' . $faker->numberBetween(10,2000),
        'left' => '' . $faker->numberBetween(10,2000),
    ];
});
