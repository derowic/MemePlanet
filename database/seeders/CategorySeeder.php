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
            'name' => 'Motoryzacja',

        ]);

        Category::create([
            'name' => 'Wiedza',

        ]);

        Category::create([
            'name' => 'Świat',

        ]);

        Category::create([
            'name' => 'Sport',

        ]);

        Category::create([
            'name' => 'Polityka',

        ]);

        Category::create([
            'name' => 'Technologia',

        ]);
    }
}
