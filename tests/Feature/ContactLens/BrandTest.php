<?php

namespace Tests\Feature\ContactLens;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\ContactLens\Brand;

class BrandTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    public function testUserCanCreateBrand()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        $brand = factory(Brand::class)->make();

        $response = $this->post("/api/contact-lens-brands", $brand->attributesToArray());
        $this->assertDatabaseHas('contact_lens_brands', $brand->attributesToArray());
        $response->assertStatus(201);

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
