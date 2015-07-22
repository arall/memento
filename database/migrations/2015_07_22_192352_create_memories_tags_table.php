<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMemoriesTagsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('memories_tags', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('memory_id')->unsigned()->references('id')->on('memories')->onDelete('cascade');
            $table->integer('tag_id')->unsigned()->references('id')->on('tags')->onDelete('cascade');
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
        Schema::drop('memories_tags');
    }
}
