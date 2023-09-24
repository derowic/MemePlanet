<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Favourite;
use App\Models\Post;

class FavouriteController extends Controller
{
    public function index(Request $request)
    {

        $user = auth()->user();
        $roles = $user->roles->pluck('name');

        $perPage = 5;

        $posts = Post::with(['user', 'comments', 'comments.user', 'comments.reply_to', 'category'])
            ->where('user',$user->id)
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        $favouriteRecords = $user->favourites;
        $favouriteRecordsWithPosts = $user->favourites->pluck('post');
        $successAttribute = trans('validation.attributes.success');

        return response()->json([
            'posts' => $posts,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $roles,
            ],
            'fav' => $favouriteRecordsWithPosts,
            'test' => $successAttribute,
        ]);
    }

    public function getTags()
    {
        $tags = Tag::all();

        return response()->json([
            'tags' => $tags,
        ]);
    }

    public function destroy($id)
    {

    }

    public function softDeletePost(string $id)
    {

    }
}
