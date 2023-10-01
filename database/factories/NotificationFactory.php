<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class NotificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'post_id' => Post::inRandomOrder()->limit(10)->pluck('id')->random(),
            'user_id' => User::inRandomOrder()->limit(10)->pluck('id')->random(),
            'seen' => null,

        ];
    }
}
