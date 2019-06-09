<?php

namespace Tests\Feature\ContactLens;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\ContactLens\Type;
use App\Models\ContactLens\Brand;

class TypeTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    public function testUserCanCreateType()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        $brand = factory(Brand::class)->create();
        $type = factory(Type::class)->make();

        $response = $this->post("/api/contact-lens-brands/{$brand->id}/types", $type->attributesToArray());
        $this->assertDatabaseHas('contact_lens_types', $type->attributesToArray());
        $response->assertStatus(201);

        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'duration',
                'brand',
                'time' => [
                    'created',
                    'updated',
                ],
            ],
        ]);
    }

    public function testUserCanUpdateType()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        $brand = factory(Brand::class)->create();
        $type = factory(Type::class)->create();
        $updates = factory(Type::class)->create();

        $response = $this->patch("/api/contact-lens-brands/{$brand->id}/types/{$type->id}");
        $response->assertStatus(200);

        $this->assertDatabaseHas('contact_lens_types', $updates->attributesToArray());
    }

    public function testUserCanDeleteType()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        $brand = factory(Brand::class)->create();
        $type = factory(Type::class)->create();

        $response = $this->delete("/api/contact-lens-brands/{$brand->id}/types/{$type->id}");
        $response->assertStatus(200);
    }

    public function testUserCanRestoreType()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        $brand = factory(Brand::class)->create();
        $type = factory(Type::class)->create();
        $type->delete();

        $response = $this->post("/api/contact-lens-brands/{$brand->id}/types/{$type->id}/restore");
        $response->assertStatus(200);

        $this->assertFalse($type->fresh()->trashed());
    }
}


