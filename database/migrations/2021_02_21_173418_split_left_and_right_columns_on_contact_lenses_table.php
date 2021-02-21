<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SplitLeftAndRightColumnsOnContactLensesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contact_lenses', function (Blueprint $table) {
            $table->dropForeign('contact_lenses_type_id_foreign');

            // set up the right columns
            $table->bigInteger('right_type_id')->unsigned()->nullable()->after('type_id');
            $table->string('right_quantity')->after('quantity');
            $table->bigInteger('right_price')->unsigned()->after('price');

            $table->renameColumn('right', 'right_prescription');

            // rename existing columns to be left columns
            $table->renameColumn('type_id', 'left_type_id');
            $table->renameColumn('left', 'left_prescription');
            $table->renameColumn('quantity', 'left_quantity');
            $table->renameColumn('price', 'left_price');

            // set foreign keys
            $table->foreign('left_type_id')->references('id')->on('contact_lens_types');
            $table->foreign('right_type_id')->references('id')->on('contact_lens_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('contact_lenses', function (Blueprint $table) {
            // drop the new foreign keys
            $table->dropForeign('contact_lenses_left_type_id_foreign');
            $table->dropForeign('contact_lenses_right_type_id_foreign');

            // drop the new columns
            $table->dropColumn('right_type_id');
            $table->dropColumn('right_quantity');
            $table->dropColumn('right_price');

            // undo renaming
            $table->renameColumn('right_prescription', 'right');
            $table->renameColumn('left_price', 'price');
            $table->renameColumn('left_quantity', 'quantity');
            $table->renameColumn('left_prescription', 'left');
            $table->renameColumn('left_type_id', 'type_id');

            $table->foreign('type_id')->references('id')->on('contact_lenses');
        });
    }
}
