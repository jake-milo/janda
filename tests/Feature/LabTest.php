<?php

namespace Tests\Feature;

use App\Models\Lab;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LabTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    /**
     * Tests that a user can create a lab.
     *
     * @return void
     */
    public function testUserCanCreateLab()
    {
        // Create user and act as them
        $user = factory(User::class)->create();
        $this->actingAs($user);

        // Get a new lab model - not persisted to database
        $lab = factory(Lab::class)->make();

        // Post the lab attributes to the create lab endpoint
        $response = $this->post('/api/labs', $lab->attributesToArray());

        // Check the lab added to the database correctly and the API
        // responded with a HTTP 201.
        $this->assertDatabaseHas('labs', $lab->attributesToArray());
        $response->assertStatus(201);

        // Check that the response structure matches what we want.
        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'lab_orders' => [],
                'time' => [
                    'created',
                    'updated',
                ],
            ],
        ]);
    }

    public function testUserCanDeleteLab()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        $lab = factory(Lab::class)->create();

        $response = $this->delete("/api/labs/{$lab->id}");

        $response->assertStatus(200);

        $this->assertSoftDeleted($lab);
    }

    public function testUserCanUpdateLab()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        $lab = factory(Lab::class)->create();
        $updates = factory(Lab::class)->make();

        $this->patch("/api/labs/{$lab->id}", $updates->attributesToArray());

        $this->assertDatabaseHas('labs', $updates->attributesToArray());
    }
}
