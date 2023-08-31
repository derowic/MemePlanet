<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class FavouriteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        \App\Models\Favourite::factory(10)->create();
    }
}
