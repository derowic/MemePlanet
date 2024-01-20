<?php

use App\Models\User;
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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class, 'sender_id');
            $table->foreignIdFor(User::class, 'receiver_id');
            $table->string('type');
            //if type = post-comment -> element_id = post id,
            //if type = comment-comment -> element_id = comment_id
            $table->unsignedBigInteger('element_id');
            $table->boolean('seen')->nullable();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
