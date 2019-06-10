<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVariantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('variants', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->bigInteger('type_id')->unsigned();
            $table->string('color');
            $table->bigInteger('price');
            $table->string('year');
            $table->integer('quantity');
            $table->string('eyesize');
            $table->string('dbl');
            $table->bigInteger('buy')->nullable();
            $table->bigInteger('sell')->nullable();

            $table->foreign('type_id')->references('id')->on('types');
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
        Schema::dropIfExists('variants');
    }
}
