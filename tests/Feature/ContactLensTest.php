<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\ContactLens;
use App\Models\User;
use App\Models\Patient;
use App\Models\Practice;
use App\Models\ContactLens\Brand;
use App\Models\ContactLens\Type;

class ContactLensTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    public function testUserCanCreateContactLens()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        factory(Patient::class)->create();
        factory(Practice::class)->create();
        factory(Brand::class)->create();
        factory(Type::class)->create();


        $contactLens = factory(ContactLens::class)->make();

        $response = $this->post("/api/contact-lenses", $contactLens->attributesToArray());
        $response->assertStatus(201);
        $this->assertDatabaseHas('contact_lenses', $contactLens->attributesToArray());


        $response->assertJsonStructure([
            'data' => [
                'id',
                'lens',
                'duration',
                'quantity',
                'price',
                'shipping_cost',
                'solutions',
                'patient',
                'practice',
                'type',
                'time' => [
                    'created',
                    'updated',
                ],
            ],
        ]);
    }

    public function testUserCanUpdateContactLens()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        factory(Patient::class)->create();
        factory(Practice::class)->create();
        factory(Brand::class)->create();
        factory(Type::class)->create();

        $contactLens = factory(ContactLens::class)->create();

        $updates = factory(ContactLens::class)->make();

        $response = $this->patch("/api/contact-lenses/{$contactLens->id}", $updates->attributesToArray());

        $response->assertStatus(200);

        $this->assertDatabaseHas('contact_lenses', $updates->attributesToArray());
    }

    public function testUserCanDeleteContactLens()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        factory(Patient::class)->create();
        factory(Practice::class)->create();
        factory(Brand::class)->create();
        factory(Type::class)->create();

        $contactLens = factory(ContactLens::class)->create();

        $response = $this->delete("/api/contact-lenses/{$contactLens->id}");

        $response->assertStatus(200);

        $this->assertSoftDeleted($contactLens);

    }

    public function testUserCanRestoreLabOrder()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        factory(Patient::class)->create();
        factory(Practice::class)->create();
        factory(Brand::class)->create();
        factory(Type::class)->create();

        $contactLens = factory(ContactLens::class)->create();
        $contactLens->delete();

        $response = $this->post("/api/contact-lenses/{$contactLens->id}/restore");

        $response->assertStatus(200);

        $this->assertFalse($contactLens->fresh()->trashed());
    }

}
