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
            'name' => 'Technology',

        ]);
    }
}
