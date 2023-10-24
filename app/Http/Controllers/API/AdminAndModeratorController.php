<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\BanList;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class AdminAndModeratorController extends Controller
{
    private function addLikesAndFavs($posts)
    {
        $favoritePosts = auth()->user()->favourites;

        $posts->each(function ($post) use ($favoritePosts) {
            $post->is_favorite = $favoritePosts->contains('post_id', $post->id);
            $post->is_liked = $post->likes()->where('user_id', auth()->id())->exists();
        });

        return $posts;
    }

    public function index(Request $request)
    {
        $perPage = 5;
        $page = $request->input('page', 1);

        $posts = Post::with(['user:id,name', 'category:id,name', 'tags'])
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

        return response()->json(['msg' => 'success'], 201);
    }

    public function hidePost(Post $post)
    {
        Post::where('id', ($post->id))->update([
            'status' => 'hide',
        ]);

        return response()->json(['msg' => 'success'], 201);
    }

    public function deletePost(Post $post)
    {
        $post->delete();

        session()->flash('toast', 'Success deleting');

        return response()->json(['msg' => 'success'], 201);
    }

    public function deleteComment(Comment $comment)
    {
        $comment->delete();

        session()->flash('toast', 'Success');

        return response()->json(['msg' => 'success'], 201);
    }

    public function banUser(Request $request)
    {
        if (! BanList::where('user_id', $request->input('user_id'))->first()) {

            $ban = new BanList();
            $ban->user_id = $request->input('user_id');
            $ban->ban_id = $request->input('ban_id');
            $ban->report_id = $request->input('report_id');
            $ban->save();

            $tmp = User::find($request->input('user_id'))->update(['ban_list_id' => $ban->id]);

            if ($ban->save()) {
                return response()->json(['msg' => $tmp], 201);
            } else {
                return response()->json(['msg' => 'Error'], 500);
            }
        }

        return response()->json(['msg' => 'This user is already banned'], 201);
    }
}
