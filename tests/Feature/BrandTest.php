<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Stock\Brand;

class BrandTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    public function testUserCanCreateBrand()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        $brand = factory(Brand::class)->make();

        $response = $this->post("/api/brands", $brand->attributesToArray());

        $this->assertDatabaseHas('brands', $brand->attributesToArray());
        $response->assertStatus(201);

        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'types' => [],
                'time' => [
                    'created',
                    'updated',
                ],
            ],
        ]);
    }

    public function testUserCanUpdateBrand()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

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

        $brand = factory(Brand::class)->create();

        $response = $this->delete("/api/brands/{$brand->id}");

        $response->assertStatus(200);
    }

    public function testUserCanRestoreBrand()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        $brand = factory(Brand::class)->create();

        $brand->delete();

        $response = $this->post("/api/brands/{$brand->id}/restore");

        $response->assertStatus(200);

        $this->assertFalse($brand->fresh()->trashed());
    }
}
