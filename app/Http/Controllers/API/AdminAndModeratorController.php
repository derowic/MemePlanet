<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Favourite;
use App\Models\Post;
use App\Models\Comment;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminAndModeratorController extends Controller
{
    public function index(Request $request)
    {
        $perPage = 5;
        $page = $request->input('page', 1);

        $posts = Post::with(['user:id,name', 'category:id,name', 'tags:id,name'])
            ->where('main_page', 1)
            ->orderBy('created_at', 'desc')
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get();

        return PostResource::collection($this->addLikesAndFavs($posts));
    }

    public function sendToMainPage(Post $post)
    {
        Post::where('id', ($post->id))->update([
            'status' => 'main page',
        ]);
        $p = Post::find($post->id);
        //$post->update(['status' => 'main page']);
        session()->flash('toast', 'Success');


        return response()->json(['msg' => "success"], 201);
    }

    public function hidePost(Post $post)
    {
        Post::where('id', ($post->id))->update([
            'status' => 'hide',
        ]);

        return response()->json(['msg' => "success"], 201);
    }

    public function deletePost(Post $post)
    {
        $post->delete();

        session()->flash('toast', 'Success');
        return response()->json(['msg' => "success"], 201);
    }

    public function deleteComment(Comment $comment)
    {
        $comment->delete();

        session()->flash('toast', 'Success');
        return response()->json(['msg' => "success"], 201);
    }

}
