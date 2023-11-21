<?php
namespace Tests\Feature;

use App\Models\User;
use App\Models\Post;
use App\Models\Comment;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use Database\Seeders\DatabaseSeeder;

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
}
