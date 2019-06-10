<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContactLensesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contact_lenses', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->bigInteger('patient_id')->unsigned();
            $table->bigInteger('practice_id')->unsigned();
            $table->bigInteger('type_id')->unsigned();
            $table->string('lens');
            $table->string('quantity');
            $table->string('price');
            $table->string('solutions');
            $table->string('right');
            $table->string('left');

            $table->foreign('patient_id')->references('id')->on('patients');
            $table->foreign('practice_id')->references('id')->on('practices');
            $table->foreign('type_id')->references('id')->on('contact_lens_types');

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
        Schema::dropIfExists('contact_lenses');
    }
}
