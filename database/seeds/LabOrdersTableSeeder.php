<?php

use Illuminate\Database\Seeder;
use App\Models\LabOrder;

class LabOrdersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(LabOrder::class, 250)->create();
    }
}
