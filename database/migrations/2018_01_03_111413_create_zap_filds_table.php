<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateZapFildsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('zap_filds', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('zap_id');
            $table->string('zap_fild')->nullable();
            $table->string('validation_id')->nullable();
            $table->string('zap_value')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('zap_filds');
    }
}
