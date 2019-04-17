<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Brand;
use App\Models\User;
use App\Models\Type;
use App\Models\Variant;

class TypeTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testUserCanCreateType()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        $brand = factory(Brand::class)->create();

        $type = factory(Type::class)->make();

        $variants = factory(Variant::class, 3)->make();

        $response = $this->post("/api/brands/{$brand->id}/types", [
            'name' => $type->name,
            'variants' => $variants->toArray(),
        ]);


        $response->assertStatus(201);
        $this->assertDatabaseHas('types', $type->attributesToArray());



        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'variants' => [],
                'brand',
            ],
        ]);


    }
}
