<?php

use Faker\Generator as Faker;
use App\Models\LabOrder;
use App\Models\Practice;
use App\Models\Patient;
use App\Models\Lab;
use Illuminate\Support\Facades\Date;

$factory->define(LabOrder::class, function (Faker $faker) {
    $dateSent = $faker->dateTimeThisYear();
    $dateSent = Date::instance($dateSent);

    $dateRequired = $dateSent->addDays(rand(4, 8));
    $dateRequired = $faker->randomElement([$dateRequired, Date::now()->addDays($faker->numberBetween(1,3))]);
    $dateReceived = $dateRequired->addDays($faker->numberBetween(-2, 2));

    $patient = Patient::inRandomOrder()->first();
    $lab = Lab::inRandomOrder()->first();

    return [
        'patient_id' => optional($patient)->id,
        'practice_id' => Practice::inRandomOrder()->first()->id,
        'lab_id' => optional($lab)->id,
        'lens' => $faker->colorName, //color name is similar to real data
        'reference' => $faker->swiftBicNumber, // sorta looks like reference num
        'date_sent' => $dateSent,
        'date_required' => $dateRequired,
        'date_received' => $faker->randomElement([$dateReceived, null]), // We only sometimes want a date received, so use the date or null
    ];
});
