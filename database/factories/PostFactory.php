<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Category;
use App\Models\Tag;
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
           
            'idUser'=>User::select('id')
                ->orderByRaw('RAND()')
                ->first()->id,  
            'title'=>$this->faker->text(25),
            'text'=>$this->faker->text(100),
            'idCategory'=>Category::select('id')
                ->orderByRaw('RAND()')
                ->first()->id,  
            'idTags'=>Tag::select('id')
                ->orderByRaw('RAND()')
                ->first()->id,  
            'likes'=>$this->faker->numberBetween(1,1000),
            'dislikes'=>$this->faker->numberBetween(1,1000),
            'pathToImage'=>null,     
            'deleted_at' => null,  
            
        ];
    }
}
