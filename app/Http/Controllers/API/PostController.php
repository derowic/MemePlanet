<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Favourite;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request)
    {

        $user = auth()->user();
        $roles = $user->roles->pluck('name');

        $perPage = 5;

        $posts = Post::with(['user', 'comments', 'comments.user', 'comments.reply_to', 'category'])
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

    public function getOnePost(Request $request)
    {
        $user = auth()->user();
        $roles = $user->roles->pluck('name');

        if ($request->has('postId')) {
            $postId = $request->postId;
            $posts = Post::with(['user', 'comments', 'comments.user', 'comments.reply_to', 'category'])
                ->where('id', $postId)
                ->get();

            $isFavourite = Favourite::where('user', $user->id)
                ->where('post', $request->postId)
                ->exists();

            return response()->json([
                'posts' => $posts,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'roles' => $roles,
                ],
                'fav' => $isFavourite,
            ]);
        } else {
            return response()->json([
                'msg' => 'error while downloading one post ',

            ]);
        }

    }

    public function getTopPosts()
    {

        $user = auth()->user();
        $roles = $user->roles->pluck('name');

        $topPosts = Post::with(['user', 'comments', 'comments.user', 'comments.reply_to', 'category'])
            ->orderBy('likes', 'desc')
            ->take(5)
            ->get();

        return response()->json([
            'posts' => $topPosts,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $roles,
            ],
        ]);
    }

    public function uploadImage(Request $request)
    {
        if ($request->hasFile('image') &&
            ($request->title != null) && ($request->title != '') &&
            ($request->text != null) && ($request->text != '') &&
            ($request->category != null) && ($request->category != 0) &&
            ($request->tags != null) && ($request->tags != '')) {

            $image = $request->file('image');
            $imageName = auth()->user()->id.time().'_'.$image->getClientOriginalName();
            $image->move(public_path('images'), $imageName);

            $post = new Post();
            $post->user = auth()->user()->id;
            $post->title = $request->title;
            $post->text = $request->text;
            $post->likes = 0;
            $post->category = $request->category;
            $post->tags = $request->tags;
            $post->path_to_image = $imageName;
            $post->created_at = now();
            $post->updated_at = now();
            $post->save();

            if ($post->save()) {
                return response()->json([
                    'imageUrl' => '/images/'.$imageName,
                    'title' => $request->title,
                    'text' => $request->text,
                    'category' => $request->category,
                    'tags' => $request->tags,
                ], 201);
            } else {

                return response()->json(['msg' => 'Error'], 500);
            }

            return response()->json(['msg' => 'No image uploaded.'], 400);
        } else {
            return response()->json(['msg' => 'error while saving comment, refresh or try later'], 500);
        }

    }

    public function like(Request $request)
    {
        if ($request->has('like') && ($request->id != null) && ($request->id != 0)) {
            $like = $request->like;
            $user = auth()->user();
            $myUserId = $user->id;
            $article = Post::find($request->id);

            if ($like === true) {
                $article->like($myUserId);

            } else {
                $article->unlike($myUserId);
            }

            Post::where('id', '=', $request->id)->update([
                'likes' => $article->likeCount,
            ]);

            return response()->json([
                'like' => $article->likeCount,

            ]);
        } else {
            return response()->json(['msg' => 'error while saving like, refresh or try later'], 500);
        }
    }

    public function addToFavourite(Request $request)
    {
        if (($request->post != null) && ($request->post != 0)) {
            $favouriteRecord = Favourite::where('user', auth()->user()->id)
                ->where('post', $request->post)
                ->first();

            if ($favouriteRecord == true) {
                Favourite::find($favouriteRecord->id)->forceDelete();

                return response()->json(['message' => 'Delete favourite']);

            } 
            else 
            {
                $tmp = new Favourite();

                $tmp->user = auth()->user()->id;
                $tmp->post = $request->post;

                $tmp->created_at = now();
                $tmp->updated_at = now();

                $tmp->save();
                if ($tmp->save()) {

                    return response()->json(
                        [
                            'id' => $request->post,
                        ], 201);
                } else {
                    return response()->json(['msg' => 'error while saving post to favourites, refresh or try later'], 500);

                }
            }
        } else {
            return response()->json(['msg' => 'error while saving post to favourites, refresh or try later'], 500);
        }

    }

    public function favourites()
    {
        $user = auth()->user();
        $favouriteRecords = $user->favourites;
        $favouriteRecordsWithPosts = $user->favourites()->with('post')->get();

        return response()->json(['fav' => $favouriteRecordsWithPosts]);

    }

    public function destroy($id)
    {

    }

    public function softDeletePost(string $id)
    {
        $post = Post::find($id);
        $post->delete();
    }
}
