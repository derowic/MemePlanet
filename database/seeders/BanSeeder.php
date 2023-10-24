<?php

namespace Database\Seeders;

use App\Models\Ban;
use Illuminate\Database\Seeder;

class BanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Ban::create([
            'name' => '3 days',
            'ban_length' => 3, // 3 dni
        ]);

        Ban::create([
            'name' => 'week',
            'ban_length' => 7, // 1 tydzień
        ]);

        Ban::create([
            'name' => 'month',
            'ban_length' => 30, // 1 miesiąc (przyjmując średnią ilość dni w miesiącu)
        ]);

        Ban::create([
            'name' => '3 months',
            'ban_length' => 90, // 3 miesiące
        ]);

        Ban::create([
            'name' => 'year',
            'ban_length' => 365, // 1 rok
        ]);

        Ban::create([
            'name' => '10 years',
            'ban_length' => 3650, // 10 lat
        ]);
    }
}
