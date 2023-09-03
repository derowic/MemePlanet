<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Like>
 */
class LikeFactory extends Factory
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
            'parent_element' => Post::select('id')
                ->orderByRaw('RAND()')
                ->first()->id,
            'user' => User::select('id')
                ->orderByRaw('RAND()')
                ->first()->id,

        ];
    }
}
