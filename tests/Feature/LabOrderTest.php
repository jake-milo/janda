<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\LabOrder;
use App\Models\User;
use App\Models\Patient;
use App\Models\Practice;
use App\Models\Lab;

class LabOrderTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    public function testUserCanCreateLabOrder()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        factory(Patient::class)->create();
        factory(Practice::class)->create();
        factory(Lab::class)->create();
        $labOrder = factory(LabOrder::class)->make();

        $response = $this->post('/api/lab-orders', $labOrder->attributesToArray());
        $response->assertStatus(201);
        $this->assertDatabaseHas('lab_orders', $labOrder->attributesToArray());

        $this->assertCreateResponse($response);
    }

    public function testUserCanUpdateLabOrder()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        factory(Patient::class)->create();
        factory(Practice::class)->create();
        factory(Lab::class)->create();

        $labOrder = factory(LabOrder::class)->create();
        $updates = factory(LabOrder::class)->make();

        $response = $this->patch("/api/lab-orders/{$labOrder->id}", $updates->attributesToArray());
        $response->assertStatus(200);
        $this->assertDatabaseHas('lab_orders', $updates->attributesToArray());
    }

    public function testUserCanDeleteLabOrder()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        factory(Patient::class)->create();
        factory(Practice::class)->create();
        factory(Lab::class)->create();
        $labOrder = factory(LabOrder::class)->create();

        $response = $this->delete("/api/lab-orders/{$labOrder->id}");

        $response->assertStatus(200);
        $this->assertSoftDeleted($labOrder);
    }

    public function testUserCanRestoreLabOrder()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        factory(Patient::class)->create();
        factory(Practice::class)->create();
        factory(Lab::class)->create();

        $labOrder = factory(LabOrder::class)->create();
        $labOrder->delete();

        $response = $this->post("/api/lab-orders/{$labOrder->id}/restore");

        $response->assertStatus(200);
        $this->assertFalse($labOrder->fresh()->trashed());
    }

    public function testUserCanCreateLabOrderWithPatient()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        factory(Practice::class)->create();
        factory(Lab::class)->create();

        $labOrder = factory(LabOrder::class)->make()->attributesToArray();
        $patient = factory(Patient::class)->make()->name;

        $data = $labOrder;
        $data['patient'] = $patient;
        unset($data['patient_id']);

        $response = $this->post("/api/lab-orders", $data);

        $response->assertStatus(201);
        $this->assertDatabaseHas('patients', ['name' => $patient]);

        $createdPatient = Patient::first();
        $labOrder['patient_id'] = $createdPatient->id;

        $this->assertDatabaseHas('lab_orders', $labOrder);
        $this->assertCreateResponse($response);
    }

    public function testUserCanCreateLabOrderWithLab()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        factory(Patient::class)->create();
        factory(Practice::class)->create();

        $labOrder = factory(LabOrder::class)->make()->attributesToArray();
        $lab = factory(Lab::class)->make()->name;

        $data = $labOrder;
        $data['lab'] = $lab;
        unset($data['lab_id']);

        $response = $this->post("/api/lab-orders", $data);

        $response->assertStatus(201);
        $this->assertDatabaseHas('labs', ['name' => $lab]);

        $createdLab = Lab::first();
        $labOrder['lab_id'] = $createdLab->id;

        $this->assertDatabaseHas('lab_orders', $labOrder);
        $this->assertCreateResponse($response);
    }


    protected function assertCreateResponse($response)
    {
        $response->assertJsonStructure([
            'data' => [
                'id',
                'lens',
                'reference',
                'dates' => [
                    'sent',
                    'required',
                    'received',
                ],
                'patient',
                'practice',
                'lab',
                'time' => [
                    'created',
                    'updated',
                ],
            ],
        ]);
    }
}
