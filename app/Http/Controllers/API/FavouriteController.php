<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Favourite;
use App\Models\Post;
use Illuminate\Http\Request;

class FavouriteController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $perPage = 15;
        $page = $request->input('page', 1);

        $favouritePostIds = Favourite::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->pluck('post_id')
            ->toArray();

        $posts = Post::whereIn('id', $favouritePostIds)
            ->orderBy('created_at', 'desc')
            ->get();

        $hasMorePosts = $posts->count() === $perPage;

        return PostResource::collection($posts);
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
