<?php

use Illuminate\Database\Seeder;
use App\Models\Lab;

class LabsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Lab::class, 10)->create();
    }
}
