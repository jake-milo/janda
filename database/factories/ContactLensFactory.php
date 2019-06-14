<?php

use Faker\Generator as Faker;
use App\Models\ContactLens;
use App\Models\Practice;
use App\Models\Patient;
use App\Models\ContactLens\Type;

$factory->define(ContactLens::class, function (Faker $faker) {
    $patient = Patient::inRandomOrder()->first();
    $type = Type::inRandomOrder()->first();

    return [
        'patient_id' => optional($patient)->id,
        'practice_id' => Practice::inRandomOrder()->first()->id,
        'type_id' => optional($type)->id,
        'quantity' => $faker->numberBetween(1, 9) . ' months',
        'price' => $faker->numberBetween(30, 200) * 100,
        'solutions' => $faker->word,
        'right' => '' . $faker->numberBetween(10,2000),
        'left' => '' . $faker->numberBetween(10,2000),
    ];
});
