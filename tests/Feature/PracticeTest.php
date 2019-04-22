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

    public function testUserCanUpdatePractice()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        $practice = factory(Practice::class)->create();
        $updates = factory(Practice::class)->make();

        $this->patch("/api/practices/{$practice->id}", $updates->attributesToArray());

        $this->assertDatabaseHas('practices', $updates->attributesToArray());
    }

    public function testUserCanDeletePractice()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        $practice = factory(Practice::class)->create();

        $response = $this->delete("api/practices/{$practice->id}");

        $response->assertStatus(200);

        $this->assertSoftDeleted($practice);
    }

    public function testUserCanRestorePractice()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        $practice = factory(Practice::class)->create();

        $practice->delete();

        $this->post("/api/practices/{$practice->id}/restore");

        $this->assertFalse($practice->fresh()->trashed());
    }
}
