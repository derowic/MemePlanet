<?php

namespace Database\Seeders;

use App\Models\Report;
use Illuminate\Database\Seeder;

class ReportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Report::create([
            'name' => 'vulgar language',
        ]);

        Report::create([
            'name' => 'wrong section',
        ]);

        Report::create([
            'name' => 'violates ethical or cultural issues',
        ]);
    }
}
