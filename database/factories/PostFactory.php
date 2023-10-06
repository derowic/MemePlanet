<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class PostFactory extends Factory
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

            'user' => User::select('id')
                ->orderByRaw('RAND()')
                ->first()->id,
            'title' => $this->faker->text(25),
            'text' => $this->faker->text(100),
            'category' => Category::select('id')
                ->orderByRaw('RAND()')
                ->first()->id,
            'tags' => Tag::select('id')
                ->orderByRaw('RAND()')
                ->first()->id,
            'likes' => $this->faker->numberBetween(1, 1000),
            'dislikes' => $this->faker->numberBetween(1, 1000),
            'path_to_image' => numberBetween(1, 75).".jpg",
            'deleted_at' => null,

        ];
    }
}
