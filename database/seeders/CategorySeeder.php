<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $humor = Category::create([
            'name' => 'humor',

        ]);


        Category::create([
            'name' => 'Automotive',

        ]);

        Category::create([
            'name' => 'Knowledge',

        ]);

        Category::create([
            'name' => 'World',

        ]);

        Category::create([
            'name' => 'Sport',

        ]);

        Category::create([
            'name' => 'Policy',

        ]);

        Category::create([
            'name' => 'Science&Technology',

        ]);

        Category::create([
            'name' => 'Anime&Manga',

        ]);

        Category::create([
            'name' => 'Latest News',

        ]);

        Category::create([
            'name' => 'Women',

        ]);

        Category::create([
            'name' => 'Men',

        ]);

        Category::create([
            'name' => 'Meme',

        ]);

        Category::create([
            'name' => 'Gaming',

        ]);

        Category::create([
            'name' => 'Wtf',

        ]);

        Category::create([
            'name' => 'Relationgship&Dating',

        ]);

        Category::create([
            'name' => 'Animals&Pets',

        ]);

        Category::create([
            'name' => 'Comic',

        ]);

        Category::create([
            'name' => 'Q&A',

        ]);

        Category::create([
            'name' => 'Movies&TV',

        ]);

        Category::create([
            'name' => 'Food',

        ]);

        Category::create([
            'name' => 'Life',

        ]);

        Category::create([
            'name' => 'Woah',

        ]);

        Category::create([
            'name' => 'Other',

        ]);
    }
}
