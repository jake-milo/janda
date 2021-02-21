<?php

use Faker\Generator as Faker;
use App\Models\ContactLens;
use App\Models\Practice;
use App\Models\Patient;
use App\Models\ContactLens\Type;

$factory->define(ContactLens::class, function (Faker $faker) {
    $patient = Patient::inRandomOrder()->first();
    $type = Type::inRandomOrder()->first();
    $type2 = Type::inRandomOrder()->first();

    return [
        'patient_id' => optional($patient)->id,
        'practice_id' => Practice::inRandomOrder()->first()->id,
        'left_type_id' => optional($type)->id,
        'right_type_id' => optional($type2)->id,
        'left_quantity' => $faker->numberBetween(1, 9) . ' months',
        'right_quantity' => $faker->numberBetween(1, 9) . ' months',
        'left_price' => $faker->numberBetween(30, 200) * 100,
        'right_price' => $faker->numberBetween(30, 200) * 100,
        'solutions' => $faker->word,
        'right_prescription' => '' . $faker->numberBetween(10, 2000),
        'left_prescription' => '' . $faker->numberBetween(10, 2000),
    ];
});
