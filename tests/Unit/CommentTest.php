<?php

namespace Tests\Feature;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class CommentTest extends TestCase
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

    public function testStoreCorrectComment()
    {
        $this->resetAndSeedDatabase();

        $user = User::find(rand(1, 3));
        $post = Post::find(rand(1, 3));
        $comments = Comment::find(rand(1, 3));

        $data = [
            'post_id' => $post->id,
            'comment_id' => null,
            'text' => 'This is a test comment.',
        ];

        $response = $this->actingAs($user)
            ->postJson(route('comment.store'), $data);

        // Wyświetl odpowiedź na konsoli
        dump($response->content());

        $response->assertStatus(201)
            ->assertJson(['message' => 'Comment added']);
    }

    public function testStoreCorrectCommentWithCorrectParentCommentData()
    {
        $this->resetAndSeedDatabase();

        $user = User::find(rand(1, 3));
        $post = Post::find(rand(1, 3));
        $comments = Comment::find(rand(1, 3));

        $data = [
            'post_id' => $post->id,
            'comment_id' => $comments->id,
            'text' => 'This is a test comment.',
        ];

        $response = $this->actingAs($user)
            ->postJson(route('comment.store'), $data);

        // Wyświetl odpowiedź na konsoli
        dump($response->content());

        $response->assertStatus(201)
            ->assertJson(['message' => 'Comment added']);
    }

    public function testStoreUnCorrectCommentNoPostId()
    {
        $this->resetAndSeedDatabase();

        //no post_id
        $user = User::find(rand(1, 3));
        $post = Post::find(rand(1, 3));
        $comments = Comment::find(rand(1, 3));

        $data = [
            'post_id' => null,
            'comment_id' => null,
            'text' => 'This is a test comment.',
        ];
        $response = $this->actingAs($user)
            ->postJson(route('comment.store'), $data);

        dump($response->content());

        $response->assertStatus(422)->assertJson(['message' => 'The post id field is required.']);

    }

    public function testStoreUnCorrectComment_NoText()
    {
        $this->resetAndSeedDatabase();

        //no text
        $user = User::find(rand(1, 3));
        $post = Post::find(rand(1, 3));
        $comments = Comment::find(rand(1, 3));

        $data = [
            'post_id' => $post->id,
            'comment_id' => null,
            'text' => null,
        ];

        $response = $this->actingAs($user)
            ->postJson(route('comment.store'), $data);

        dump($response->content());

        $response->assertStatus(422)->assertJson(['message' => 'The text field is required.']);
    }

    public function testStoreUnCorrectComment_EmptyText()
    {
        $this->resetAndSeedDatabase();
        //empty text
        $user = User::find(rand(1, 3));
        $post = Post::find(rand(1, 3));
        $comments = Comment::find(rand(1, 3));

        $data = [
            'post_id' => $post->id,
            'comment_id' => null,
            'text' => '',
        ];

        $response = $this->actingAs($user)
            ->postJson(route('comment.store'), $data);

        dump($response->content());

        $response->assertStatus(422)->assertJson(['message' => 'The text field is required.']);

    }

    public function testStoreComment_withFaultParentComment()
    {
        $this->resetAndSeedDatabase();

        $user = User::find(rand(1, 3));
        $post = Post::find(rand(1, 3));
        $comments = Comment::find(rand(1, 3));

        $data = [
            'post_id' => $post->id,
            'comment_id' => -2,
            'text' => 'This is a test comment.',
        ];

        $response = $this->actingAs($user)
            ->postJson(route('comment.store'), $data);

        // Wyświetl odpowiedź na konsoli
        dump($response->content());

        $response->assertStatus(422)
            ->assertJson(['message' => 'The selected comment id is invalid. (and 1 more error)']);
    }
}
