<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(PatientsTableSeeder::class);
        $this->call(LabsTableSeeder::class);
        $this->call(PracticesTableSeeder::class);
        $this->call(LabOrdersTableSeeder::class);
        $this->call(ContactLensBrandSeeder::class);
        $this->call(ContactLensTypeSeeder::class);
        $this->call(ContactLensesTableSeeder::class);
        $this->call(StockSeeder::class);
    }
}
