<?php

use Illuminate\Database\Seeder;
use App\Models\Practice;

class PracticesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->getPractices() as $practice) {
            Practice::create($practice);
        }
    }


    protected function getPractices()
    {
        return [
            [
                'name' => 'Saxmundham',
            ],

            [
                'name' => 'Harleston',
            ],

            [
                'name' => 'Ipswich',
            ],

            [
                'name' => 'Halesworth',
            ],
        ];

    }
}
