<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Stock\Manufacturer;

class ManufacturerTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    public function testUserCanCreateManufacturer()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        $manufacturer = factory(Manufacturer::class)->make();

        $response = $this->post("/api/manufacturers", $manufacturer->attributesToArray());

        $this->assertDatabaseHas('manufacturers', $manufacturer->attributesToArray());
        $response->assertStatus(201);

        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'brands' => [],
                'time' => [
                    'created',
                    'updated'
                ],
            ],
        ]);
    }
}
