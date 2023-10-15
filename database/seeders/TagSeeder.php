<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $humor = Tag::create([
            'name' => 'mem',

        ]);
        Tag::create([
            'name' => 'jokes',

        ]);

        Tag::create([
            'name' => 'discussion',

        ]);

        Tag::create([
            'name' => 'trivia',

        ]);

        Tag::create([
            'name' => 'history',

        ]);

        Tag::create([
            'name' => 'army',

        ]);

        Tag::create([
            'name' => 'information',

        ]);
    }
}
