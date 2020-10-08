<?php

namespace Tests\Feature\Stock;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Stock\Brand;
use App\Models\User;
use App\Models\Stock\Type;
use App\Models\Stock\Variant;
use App\Models\Stock\Manufacturer;

class TypeTest extends TestCase
{
    use RefreshDatabase, WithFaker;


    public function testUserCanCreateType()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        factory(Manufacturer::class)->create();

        $brand = factory(Brand::class)->create();

        $type = factory(Type::class)->make();

        $variants = factory(Variant::class, 3)->make();

        $response = $this->post("/api/brands/{$brand->id}/types", [
            'name' => $type->name,
            'buy' => $type->buy,
            'sell' => $type->sell,
            'variants' => $variants->toArray(),
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('types', $type->attributesToArray());

        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'buy',
                'sell',
                'variants' => [],
                'brand',
            ],
        ]);
    }

    public function testUserCanUpdateType()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        factory(Manufacturer::class)->create();

        factory(Brand::class)->create()
            ->types()
            ->save(factory(Type::class)->make())
            ->variants()
            ->saveMany(factory(Variant::class, 2)->make());

        $updates = [
            'name' => 'yeet',
            'buy' => 200000,
            'sell' => 7000000,
            'variants' => [
                [
                    'id' => 1,
                    'color' => 'colorupdate',
                    'year' => '3035',
                    'quantity' => 34,
                    'eyesize' => '20mm',
                    'dbl' => '20mm',
                    'buy' => NULL,
                    'sell' => NULL,
                ],
            ],
        ];

        $response = $this->patch('/api/brands/1/types/1', $updates);

        $response->assertStatus(200);

        $response->assertJson([
            'data' => $updates,
        ]);
    }


    public function testUserCanDeleteType()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        factory(Manufacturer::class)->create();
        $type = factory(Brand::class)->create()
            ->types()
            ->save(factory(Type::class)->make());

        $variants = $type->variants()
            ->saveMany(factory(Variant::class, 2)->make());

        $response = $this->delete('/api/brands/1/types/1');

        $response->assertStatus(200);

        $this->assertSoftDeleted($type);

        $variants->each(function ($variant) {
            $this->assertSoftDeleted($variant);
        });
    }

    public function testUserCanRestoreType()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        factory(Manufacturer::class)->create();
        $type = factory(Brand::class)->create()
            ->types()
            ->save(factory(Type::class)->make());

        $variants = $type->variants()
            ->saveMany(factory(Variant::class, 2)->make());

        $type->delete();

        $response = $this->post('/api/brands/1/types/1/restore');

        $response->assertStatus(200);

        $this->assertFalse($type->fresh()->trashed());

        $variants->each(function ($variant) {
            $this->assertFalse($variant->fresh()->trashed());
        });
    }
}
