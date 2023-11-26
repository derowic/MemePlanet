<?php

namespace Tests\Feature;

use App\Models\Post;
use App\Models\Report;
use App\Models\User;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class ReportTest extends TestCase
{
    public function resetAndSeedDatabase()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        $tables = DB::select('SHOW TABLES');
        $tables = array_map('current', json_decode(json_encode($tables), true));
        foreach ($tables as $table) {
            DB::table($table)->truncate();
        }
        DB::statement('SET FOREIGN_KEY_CHECKS=1');
        Artisan::call('db:seed');
    }

    public function testStoreCorrectReportToPost()
    {
        $this->resetAndSeedDatabase();

        $user = User::find(rand(1, 8));
        $post = Post::find(rand(1, 3));
        $report = Report::find(rand(1, 3));

        $data = [
            'post_id' => $post->id,
            'report_id' => $report->id,
        ];

        $response = $this->actingAs($user)
            ->postJson(route('reportList.store'), $data);

        $response->assertStatus(201)
            ->assertJson(['message' => 'Thanks']);
    }

    public function testStoreUnCorrectReportToPost_NoPost()
    {
        $this->resetAndSeedDatabase();

        $user = User::find(rand(1, 8));
        $post = Post::find(rand(1, 3));
        $report = Report::find(rand(1, 3));

        $data = [
            'post_id' => null,
            'report_id' => $report->id,
        ];

        $response = $this->actingAs($user)
            ->postJson(route('reportList.store'), $data);

        $response->assertStatus(422)
            ->assertJson(['message' => 'The post id field is required.']);
    }

    public function testStoreUnCorrectReportToPost_NoReport()
    {
        $this->resetAndSeedDatabase();

        $user = User::find(rand(1, 8));
        $post = Post::find(rand(1, 3));
        $report = Report::find(rand(1, 3));

        $data = [
            'post_id' => $post->id,
            'report_id' => null,
        ];

        $response = $this->actingAs($user)
            ->postJson(route('reportList.store'), $data);

        $response->assertStatus(422)
            ->assertJson(['message' => 'The report id field is required.']);
    }
}
