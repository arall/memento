<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMemoriesPersonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('memories_persons', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('memory_id')->unsigned()->references('id')->on('memories')->onDelete('cascade');
            $table->integer('person_id')->unsigned()->references('id')->on('persons')->onDelete('cascade');
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
        Schema::drop('memories_persons');
    }
}
