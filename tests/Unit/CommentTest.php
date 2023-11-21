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
use Database\Seeders\DatabaseSeeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Artisan;

class CommentTest extends TestCase
{
    function resetAndSeedDatabase()
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

    public function testStoreCorrectPost()
    {
        $this->resetAndSeedDatabase();

        $user = User::find(rand(1,3));
        $post = Post::find(rand(1,3));
        $comments = Comment::find(rand(1,3));

        $commentData = [
            'post_id' => $post->id,
            'comment_id' => null,
            'text' => 'This is a test comment.',
        ];

        $response = $this->actingAs($user)
            ->postJson(route('comment.store'), $commentData);

        $response->assertStatus(201)
            ->assertJson(['msg' => 'Comment added']);
    }


    public function testStoreUnCorrectPostNoPostId()
    {
        $this->resetAndSeedDatabase();

        //no post_id
        $user = User::find(rand(1,3));
        $post = Post::find(rand(1,3));
        $comments = Comment::find(rand(1,3));

        $commentData = [
            'post_id' => null,
            'comment_id' => null,
            'text' => 'This is a test comment.',
        ];
        $response = $this->actingAs($user)
            ->postJson(route('comment.store'), $commentData);

        $response->assertStatus(500)->assertJson(['msg' => 'Error while saving comment']);

    }

    public function testStoreUnCorrectNoText()
    {
        $this->resetAndSeedDatabase();

        //no text
        $user = User::find(rand(1,3));
        $post = Post::find(rand(1,3));
        $comments = Comment::find(rand(1,3));

        $commentData = [
            'post_id' => $post->id,
            'comment_id' => null,
            'text' => null,
        ];

        $response = $this->actingAs($user)
            ->postJson(route('comment.store'), $commentData);

        $response->assertStatus(500)->assertJson(['msg' => 'Error while saving comment']);
    }

    public function testStoreUnCorrectEmptyText()
    {
        $this->resetAndSeedDatabase();
         //empty text
         $user = User::find(rand(1,3));
         $post = Post::find(rand(1,3));
         $comments = Comment::find(rand(1,3));

         $commentData = [
             'post_id' => $post->id,
             'comment_id' => null,
             'text' => "",
         ];

         $response = $this->actingAs($user)
             ->postJson(route('comment.store'), $commentData);

        $response->assertStatus(500)->assertJson(['msg' => 'Error while saving comment']);

    }


}
