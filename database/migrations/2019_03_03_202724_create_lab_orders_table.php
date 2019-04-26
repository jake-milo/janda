<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLabOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lab_orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->bigInteger('patient_id')->unsigned();
            $table->bigInteger('lab_id')->unsigned();
            $table->bigInteger('practice_id')->unsigned();
            $table->string('lens');
            $table->string('reference');
            $table->date('date_sent');
            $table->date('date_required');
            $table->date('date_received')->nullable();

            $table->foreign('patient_id')->references('id')->on('patients');
            $table->foreign('lab_id')->references('id')->on('labs');
            $table->foreign('practice_id')->references('id')->on('practices');

            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lab_orders');
    }
}
