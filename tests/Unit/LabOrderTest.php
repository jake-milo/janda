<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Date;
use App\Models\LabOrder;
use App\Models\Patient;
use App\Models\Practice;
use App\Models\Lab;


class LabOrderTest extends TestCase
{

    use WithFaker, RefreshDatabase;

    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function testOverdueScope()
    {
        $this->createLabOrders();

        $overdueCount = LabOrder::overdue()->count();

        $this->assertEquals(3, $overdueCount);
    }

    protected function createLabOrders()
    {

        factory(Patient::class)->create();
        factory(Practice::class)->create();
        factory(Lab::class)->create();

        factory(LabOrder::class, 3)
            ->make()
            ->each(function (LabOrder $labOrder) {
                $labOrder->date_required = Date::now()->subDays(2);
                $labOrder->save();
            });

        factory(LabOrder::class, 2)
            ->make()
            ->each(function (LabOrder $labOrder) {
                $labOrder->date_required = Date::now()->addDays(2);
                $labOrder->save();
            });
    }
}
