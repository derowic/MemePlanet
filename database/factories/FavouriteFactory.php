<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Post;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class FavouriteFactory extends Factory
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
            'idPost'=>Post::select('id')
                ->orderByRaw('RAND()')
                ->first()->id,  
            
        ];
    }
}
