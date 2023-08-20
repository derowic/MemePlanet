<?php

namespace Database\Seeders;

use App\Models\Tag;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $humor = Tag::create([
            'text' => 'mem',
            
        ]);
        Tag::create([
            'text' => 'dowcipy',
            
        ]);

        Tag::create([
            'text' => 'dyskusja',
            
        ]);

        Tag::create([
            'text' => 'ciekawostki',
            
        ]);

        Tag::create([
            'text' => 'historia',
            
        ]);

        Tag::create([
            'text' => 'wojsko',
            
        ]);

        Tag::create([
            'text' => 'informacje',
            
        ]);
    }
}
