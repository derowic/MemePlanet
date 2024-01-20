<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class LikeableSeeder extends Seeder
{
    public function run()
    {
        $users = User::all();
        $posts = Post::all();
        foreach ($posts as $post) {
            $usersToLike = $users->random(rand(1, count($users)));
            foreach ($usersToLike as $user) {
                $post->like($user->id);

            }
            $post->likes = $post->likeCount;
            $post->save();
        }

        $this->command->info('Wygenerowano losowe polubienia dla postów.');

        $comments = Comment::all();

        foreach ($comments as $comment) {
            $usersToLike = $users->random(rand(1, count($users)));
            foreach ($usersToLike as $user) {
                $comment->like($user->id);

            }
            $comment->likes = $comment->likeCount;
            $comment->save();
        }

        $this->command->info('Wygenerowano losowe polubienia dla komentarzy.');

    }
}
