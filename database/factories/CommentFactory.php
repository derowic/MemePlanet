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
            //
            'post' => Post::select('id')
                ->orderByRaw('RAND()')
                ->first()->id,
            'user' => User::select('id')
                ->orderByRaw('RAND()')
                ->first()->id,
            'text' => $this->faker->unique()->word(),
            'likes' => $this->faker->numberBetween(1, 1000),
            'parent_comment' => null,
            'deleted_at' => null,

        ];
    }
}
