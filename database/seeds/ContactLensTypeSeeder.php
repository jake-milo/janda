<?php

use Illuminate\Database\Seeder;
use App\Models\ContactLens\Type;

class ContactLensTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Type::class, 30)->create();
    }
}
