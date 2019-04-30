<?php

use Illuminate\Database\Seeder;
use App\Models\ContactLens\Brand;

class ContactLensBrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Brand::class, 30)->create();
    }
}
