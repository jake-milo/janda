<?php

use Illuminate\Database\Seeder;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->getUsers() as $user) {
            User::withoutEvents(function () use ($user) {
                $u = new User($user);

                $u->save();
            });
        }
    }

    protected function getUsers()
    {
        return [
            [
                'name' => env('ADMIN_NAME'),
                'email' => env('ADMIN_EMAIL'),
                'password' => bcrypt(env('ADMIN_PASSWORD')),
            ],
        ];
    }
}
