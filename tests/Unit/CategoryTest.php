<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class CategoryTest extends TestCase
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

    public function testStoreCorrectCategory()
    {
        $this->resetAndSeedDatabase();

        $user = User::find(1);

        $data = [
            'name' => 'test',
        ];

        $response = $this->actingAs($user)
            ->postJson(route('category.store'), $data);

        dump($response->content());

        $response->assertStatus(200)
            ->assertJson(['message' => 'Success, category added']);

    }

    public function testStoreUnCorrectCategory_EmptyText()
    {
        $this->resetAndSeedDatabase();

        $user = User::find(1);

        $data = [
            'name' => '',
        ];

        $response = $this->actingAs($user)
            ->postJson(route('category.store'), $data);

        dump($response->content());

        $response->assertStatus(422)
            ->assertJson(['message' => 'The name field is required.']);
    }

    public function testStoreUnCorrectCategory_TextNull()
    {
        $this->resetAndSeedDatabase();

        $user = User::find(1);

        $data = [
            'name' => null,
        ];

        $response = $this->actingAs($user)
            ->postJson(route('category.store'), $data);

        dump($response->content());

        $response->assertStatus(422)
            ->assertJson(['message' => 'The name field is required.']);
    }

    public function testStoreUnCorrectCategory_CategoryAlreadyExists()
    {
        $this->resetAndSeedDatabase();

        $user = User::find(1);

        $data = [
            'name' => 'humor',
        ];

        $response = $this->actingAs($user)
            ->postJson(route('category.store'), $data);

        dump($response->content());

        $response->assertStatus(422)
            ->assertJson(['message' => 'The name has already been taken.']);
    }
}
