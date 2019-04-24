<?php

namespace Tests\Feature;

use App\Models\Patient;
use App\Models\User;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PatientTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    public function testUserCanCreatePatient()
    {
        // Create a new user and act as them
        $user = factory(User::class)->create();
        $this->actingAs($user);

        // Get a new lab model - not persisted to database
        $patient = factory(Patient::class)->make();

        // Post the lab attributes to the create lab endpoint
        $response = $this->post('/api/patients', $patient->attributesToArray());

        // Check the lab added to the database correctly and the API
        // responded with a HTTP 201.
        $this->assertDatabaseHas('patients', $patient->attributesToArray());
        $response->assertStatus(201);

        // Check that the response structure matches what we want.
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

    public function testUsercanUpdatePatient()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        $patient = factory(Patient::class)->create();
        $updates = factory(Patient::class)->create();

        $response = $this->patch("/api/patients/{$patient->id}", $updates->attributesToArray());

        $response->assertStatus(200);

        $this->assertDatabaseHas('patients', $updates->attributesToArray());
    }

    public function testUserCanDeletePatient()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        $patient = factory(Patient::class)->create();

        $response = $this->delete("/api/patients/{$patient->id}");

        $response->assertStatus(200);

        $this->assertSoftDeleted($patient);
    }

    public function testUserCanRestorePatient()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        $patient = factory(Patient::class)->create();
        $patient->delete();

        $response = $this->post("/api/patients/{$patient->id}/restore");

        $response->assertStatus(200);

        $this->assertFalse($patient->fresh()->trashed());
    }

}
