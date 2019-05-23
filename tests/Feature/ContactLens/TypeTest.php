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
                'brand',
                'time' => [
                    'created',
                    'updated',
                ],
            ],
        ]);
    }
}
