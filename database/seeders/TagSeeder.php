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
            'name' => 'dowcipy',

        ]);

        Tag::create([
            'name' => 'dyskusja',

        ]);

        Tag::create([
            'name' => 'ciekawostki',

        ]);

        Tag::create([
            'name' => 'historia',

        ]);

        Tag::create([
            'name' => 'wojsko',

        ]);

        Tag::create([
            'name' => 'informacje',

        ]);
    }
}
