<?php

namespace Tests\Feature\Stock;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Stock\Brand;
use App\Models\Stock\Manufacturer;

class BrandTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    public function testUserCanCreateBrand()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        factory(Manufacturer::class)->create();

        $brand = factory(Brand::class)->make()->attributesToArray();

        $response = $this->post("/api/brands", $brand);

        $this->assertDatabaseHas('brands', $brand);
        $response->assertStatus(201);

        $this->assertCreateResponse($response);
    }

    public function testUserCanCreateBrandWithManufacturer()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        $brand = factory(Brand::class)->make()->attributesToArray();
        $manufacturer = factory(Manufacturer::class)->make()->name;

        $data = $brand;

        $data['manufacturer'] = $manufacturer;

        unset($data['manufacturer_id']);

        $response = $this->post("/api/brands", $data);

        $response->assertStatus(201);

        $this->assertDatabaseHas('manufacturers', ['name' => $manufacturer]);

        $createdManufacturer = Manufacturer::first();

        $brand['manufacturer_id'] = $createdManufacturer->id;

        $this->assertDatabaseHas('brands', $brand);

        $this->assertCreateResponse($response);
    }

    public function testUserCanUpdateBrand()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        factory(Manufacturer::class)->create();
        $brand = factory(Brand::class)->create();
        $updates = factory(Brand::class)->create();

        $response = $this->patch("/api/brands/{$brand->id}", $updates->attributesToArray());

        $response->assertStatus(200);

        $this->assertDatabaseHas('brands', $updates->attributesToArray());
    }

    public function testUserCanDeleteBrand()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        factory(Manufacturer::class)->create();
        $brand = factory(Brand::class)->create();

        $response = $this->delete("/api/brands/{$brand->id}");

        $response->assertStatus(200);
    }

    public function testUserCanRestoreBrand()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        factory(Manufacturer::class)->create();
        $brand = factory(Brand::class)->create();

        $brand->delete();

        $response = $this->post("/api/brands/{$brand->id}/restore");

        $response->assertStatus(200);

        $this->assertFalse($brand->fresh()->trashed());
    }

    protected function assertCreateResponse($response)
    {
        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'time' => [
                    'created',
                    'updated',
                ],
            ],
        ]);
    }
}
