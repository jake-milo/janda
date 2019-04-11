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
}