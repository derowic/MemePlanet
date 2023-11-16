<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Favourite;
use App\Models\Post;
use Illuminate\Http\Request;
use App\Repositories\PostRepository;

class FavouriteController extends Controller
{
    protected $postRepository;

    public function __construct(PostRepository $postRepository)
    {
        $this->postRepository = $postRepository;
    }

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

        return PostResource::collection($this->postRepository->addLikesAndFavs($posts) );
    }

    public function store(Request $request)
    {
        if (($request->post != null) && ($request->post != 0)) {
            $favouriteRecord = Favourite::where('user_id', auth()->user()->id)
                ->where('post_id', $request->post)
                ->first();

            if ($favouriteRecord == true) {
                Favourite::find($favouriteRecord->id)->forceDelete();

                return response()->json(['msg' => 'Post removed from favourites']);

            } else {
                $tmp = new Favourite();
                $tmp->user_id = auth()->user()->id;
                $tmp->post_id = $request->post;
                $tmp->created_at = now();
                $tmp->updated_at = now();
                $tmp->save();
                if ($tmp->save()) {

                    return response()->json(['msg' => 'Post added to favourite'], 201);
                } else {
                    return response()->json(['msg' => 'Error while adding post to favourites'], 500);
                }
            }
        } else {
            return response()->json(['msg' => 'Error'], 500);
        }
    }
}
