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

        $this->assertCreateResponse($response);
    }

    public function testUsercanCreateContactLensWithPatient()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        factory(Practice::class)->create();
        factory(Brand::class)->create();
        factory(Type::class)->create();

        // get contact lens array
        $contactLens = factory(ContactLens::class)->make()->attributesToArray();
        // get new patient name
        $patient = factory(Patient::class)->make()->name;

        // create array that we will post to api
        $data = $contactLens;
        // add the new patient name in
        $data['patient'] = $patient;
        // and remove this smelly lingering patient_id
        unset($data['patient_id']);
        // post to the api
        $response = $this->post("/api/contact-lenses", $data);
        // check it created
        $response->assertStatus(201);
        // check our new patient is in the database
        $this->assertDatabaseHas('patients', ['name' => $patient]);

        // get our new patient from the database
        $createdPatient = Patient::first();
        // Add the patient_id to the contactLens array
        $contactLens['patient_id'] = $createdPatient->id;
        // check the contact lens was created properly
        $this->assertDatabaseHas('contact_lenses', $contactLens);

        // Assert the response was right
        $this->assertCreateResponse($response);
    }


     public function testUserCanCreateContactLensWithType()
     {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        factory(Patient::class)->create();
        factory(Practice::class)->create();
        factory(Brand::class)->create();
        $contactLens = factory(ContactLens::class)->make()->attributesToArray();

        $type = factory(Type::class)->make();
        $duration = $type->duration;
        $brandId = $type->brand_id;
        $type = $type->name;

        $data = $contactLens;
        $data['type'] = $type;
        $data['duration'] = $duration;
        $data['brand_id'] = $brandId;
        unset($data['type_id']);

        $response = $this->post("/api/contact-lenses", $data);
        $response->assertStatus(201);
        $this->assertDatabaseHas('contact_lens_types', ['name' => $type, 'duration' => $duration, 'brand_id' => $brandId] );

        $createdType = Type::first();
        $contactLens['type_id'] = $createdType->id;

        $this->assertDatabaseHas('contact_lenses', $contactLens);
        $this->assertCreateResponse($response);
     }


     public function testUserCanCreateContactLensWithTypeAndBrand(){
         $user = factory(User::class)->create();
         $this->actingAs($user);

         factory(Patient::class)->create();
         factory(Practice::class)->create();
         $contactLens = factory(ContactLens::class)->make()->attributesToArray();

         $brand = factory(Brand::class)->make()->name;

         $type = factory(Type::class)->make();
         $duration = $type->duration;
         $type = $type->name;

         $data = $contactLens;
         $data['brand'] = $brand;
         $data['type'] = $type;
         $data['duration'] = $duration;

         unset($data['type_id'], $data['brand_id']);

         $response = $this->post("/api/contact-lenses", $data);
         $response->assertStatus(201);
         $this->assertDatabaseHas('contact_lens_types', ['name' => $type, 'duration' => $duration]);
         $this->assertDatabaseHas('contact_lens_brands', ['name' => $brand] );

         $createdBrand = Brand::first();
         $createdType = Type::first();
         $contactLens['type_id'] = $createdType->id;
         $this->assertDatabaseHas('contact_lenses', $contactLens);
         $this->assertCreateResponse($response);
     }

    protected function assertCreateResponse($response)
    {
        $response->assertJsonStructure([
            'data' => [
                'id',
                'quantity',
                'price',
                'solutions',
                'right',
                'left',
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
