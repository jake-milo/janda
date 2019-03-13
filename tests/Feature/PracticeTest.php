<?php

namespace Tests\Feature;

use App\Models\Practice;
use App\Models\User;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PracticeTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    public function testUserCanCreatePractice()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        $practice = factory(Practice::class)->make();

        $response = $this->post('/api/practices', $practice->attributesToArray());

        $this->assertDatabaseHas('practices', $practice->attributesToArray());
        $response->assertStatus(201);


        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'lab_orders' => [],
                'contact_lenses' => [],
                'time' => [
                    'created',
                    'updated',
                ],
            ],
        ]);
    }
}
