<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'post_id' => Post::inRandomOrder()->limit(10)->pluck('id')->random(),
            'user_id' => User::inRandomOrder()->limit(10)->pluck('id')->random(),
            'text' => $this->faker->unique()->word(),
            'likes' => 0, //$this->faker->numberBetween(1, 1000),
            'comment_id' => 0,
            'deleted_at' => null,
        ];
    }
}
