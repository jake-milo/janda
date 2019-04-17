<?php

use Illuminate\Database\Seeder;
use App\Models\ContactLens;

class ContactLensesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(ContactLens::class, 150)->create();
    }
}
