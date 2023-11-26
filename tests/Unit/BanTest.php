<?php

namespace Tests\Feature;

use App\Models\Ban;
use App\Models\BanList;
use App\Models\Report;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Support\Facades\Artisan; // Dodaj use do DatabaseSeeder
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class BanTest extends TestCase
{
    public function resetAndSeedDatabase()
    {
        // Wyłącz sprawdzanie kluczy obcych
        DB::statement('SET FOREIGN_KEY_CHECKS=0');

        // Pobierz nazwy wszystkich tabel w bazie danych
        $tables = DB::select('SHOW TABLES');
        $tables = array_map('current', json_decode(json_encode($tables), true));

        // Wyzeruj wszystkie tabele
        foreach ($tables as $table) {
            DB::table($table)->truncate();
        }

        // Włącz sprawdzanie kluczy obcych
        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        // Uruchom seeder
        Artisan::call('db:seed');
    }

    public function testBanCheck()
    {

        $this->resetAndSeedDatabase();

        $user = User::find(1);
        $report = Report::find(1);
        $ban = Ban::find(1);
        $bannedUser = User::find(4);

        $data = [
            'user_id' => $bannedUser->id,
            'ban_id' => $ban->id,
            'report_id' => $report->id,
        ];

        $response = $this->actingAs($user)
            ->postJson(route('ban.banUser'), $data);

        $response->assertStatus(201)->assertJson(['message' => true]);

        $response = $this->actingAs($bannedUser)
            ->getJson(route('ban.check'));

        $response->assertStatus(200)
            ->assertJson(['data' => true]);


        $banListRecord = BanList::where('user_id', $bannedUser->id)->first();

        if ($banListRecord) {
            $banListRecord->update(['created_at' => now()->subDays(4)]);
        }

        $response = $this->actingAs($bannedUser)
            ->getJson(route('ban.check'));

        $response->assertStatus(200)
            ->assertJson(['data' => false]);
    }
}
