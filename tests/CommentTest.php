<?php

namespace Tests\Feature;

namespace Tests\Feature;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase; // Dodaj use do DatabaseSeeder

class CommentTest extends TestCase
{
    /*
        use RefreshDatabase;

        public function setUp(): void
        {
            parent::setUp();

            // Wywołaj seeder'y bezpieczając się przed wielokrotnym ich uruchomieniem
            if (!app()->environment('production')) {
                $this->seed(DatabaseSeeder::class);
            }
        }*/

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
