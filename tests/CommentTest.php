<?php

namespace Tests\Feature;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CommentTest extends TestCase
{
    public function testStorePost()
    {
        $user = User::find(rand(1, 3));
        $post = Post::find(rand(1, 3));
        $comments = Comment::find(rand(1, 3));

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
}
