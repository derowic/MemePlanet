<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user');
            $table->unsignedBigInteger('post');
            $table->unsignedBigInteger('parent_comment')->nullable(); //jest parent Comment to
            //$table->boolean('responseTo')->nullable();
            $table->string('text', 100)->nullable();
            $table->integer('likes')->nullable();
            $table->softDeletes();
            //$table->unsignedBigInteger('responseTo')->nullable();
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
