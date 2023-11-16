<?php

namespace App\Repositories;

use App\Http\Requests\PostRequest;
use App\Models\Post;

class PostRepository
{
    public function addLikesAndFavs($posts)
    {
        $favoritePosts = auth()->user()->favourites;

        $posts->each(function ($post) use ($favoritePosts) {
            $post->is_favorite = $favoritePosts->contains('post_id', $post->id);
            $post->is_liked = $post->likes()->where('user_id', auth()->id())->exists();
        });

        return $posts;
    }

    private function prepareData(PostRequest $request)
    {
        $data = [
            'name' => $request->input('name'),
            'status' => $request->input('finishedPost') ? 'Posted' : 'draft',
            'user_id' => auth()->user()->id,
            'totalCost' => $request->input('totalCost'),
        ];

        return $data;
    }

    public function createPost(PostRequest $request)
    {
        return Post::create($this->prepareData($request));
    }

    public function updatePost(PostRequest $request)
    {
        return Post::where('id', $request->input('id'))->update($this->prepareData($request));
    }

    public function deletePost(PostRequest $request)
    {
        return Post::where('id', $request->input('id'))->delete();
    }
}
