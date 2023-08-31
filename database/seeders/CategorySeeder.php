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
            'text' => 'humor',

        ]);
        Category::create([
            'text' => 'Motoryzacja',

        ]);

        Category::create([
            'text' => 'Wiedza',

        ]);

        Category::create([
            'text' => 'Świat',

        ]);

        Category::create([
            'text' => 'Sport',

        ]);

        Category::create([
            'text' => 'Polityka',

        ]);

        Category::create([
            'text' => 'Technologia',

        ]);
    }
}
