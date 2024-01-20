<?php

namespace Database\Factories;

use App\Models\Category;
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
        $statuses = ['main page', 'hide', 'waiting'];

        return [
            'user_id' => User::inRandomOrder()->limit(10)->pluck('id')->random(),
            'title' => $this->faker->text(25),
            'text' => $this->faker->text(100),
            'category_id' => Category::inRandomOrder()->limit(10)->pluck('id')->random(),
            'likes' => 0, //$this->faker->numberBetween(1, 1000),
            'dislikes' => $this->faker->numberBetween(1, 1000),
            //'path_to_image' => "/no_image/".$this->faker->numberBetween(1, 5).'.png',
            'path_to_image' => $this->faker->numberBetween(1, 10).'.jpg',
            'status' => $this->faker->randomElement($statuses),
            'deleted_at' => null,
        ];
    }
}
