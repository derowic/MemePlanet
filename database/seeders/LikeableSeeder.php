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
        // Pobierz już utworzonych użytkowników
        $users = User::all();

        // Tworzenie kilku przykładowych postów
        $posts = Post::all();

        // Dodawanie losowych polubień do różnych postów od różnych użytkowników

        foreach ($posts as $post) {
            $usersToLike = $users->random(rand(1, count($users)));
            foreach ($usersToLike as $user) {
                $post->like($user->id);

            }
            $post->likes = $post->likeCount;
            $post->save();
        }
        /*
        $myUserId = $user->id;
        $article = Post::find($request->id);

        if ($like === true) {
            $article->like($myUserId);
            */

        $this->command->info('Wygenerowano losowe polubienia dla postów.');

        // Tworzenie kilku przykładowych komentarzy
        $comments = Comment::all();

        // Dodawanie losowych polubień do różnych komentarzy od różnych użytkowników
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
