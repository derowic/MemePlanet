<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idUser');
            $table->string('title', 25)->nullable();
            $table->string('text', 255)->nullable();
            $table->unsignedBigInteger('idCategory');
            $table->string('idTags', 255)->nullable();
            $table->integer('likes')->nullable();
            $table->integer('dislikes')->nullable();
            $table->string('pathToImage')->nullable();
            $table->softDeletes();
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
        Schema::dropIfExists('posts');
    }
};
