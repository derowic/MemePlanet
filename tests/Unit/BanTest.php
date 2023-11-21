<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Post;
use App\Models\Report;
use App\Models\Ban;
use App\Models\BanList;
use App\Models\Comment;
use Database\Seeders\DatabaseSeeder; // Dodaj use do DatabaseSeeder
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Artisan;

class BanTest extends TestCase
{
    function resetAndSeedDatabase()
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

        $response->assertStatus(201)->assertJson(['msg' => true]);

        $response = $this->actingAs($bannedUser)
        ->getJson(route('ban.check'));

        $response->assertStatus(200)
        ->assertJson(['data' => true]);

        //dump($response);

        $banListRecord = BanList::where('user_id', $bannedUser->id)->first();

        // Sprawdź, czy rekord istnieje
        if ($banListRecord) {
            // Przesuń created_at o 4 dni wstecz
            $banListRecord->update(['created_at' => now()->subDays(4)]);
        }

        $response = $this->actingAs($bannedUser)
        ->getJson(route('ban.check'));

        $response->assertStatus(200)
        ->assertJson(['data' => false]);
    }

}
