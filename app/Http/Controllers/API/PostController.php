<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Favourite;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
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
        $perPage = 15;
        $page = $request->input('page', 1);

        $posts = Post::with(['user:id,name', 'category:id,name', 'tags:id,name'])
            ->orderBy('created_at', 'desc')
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get();

        return PostResource::collection($this->addLikesAndFavs($posts));
    }


    public function fresh(Request $request)
    {
        $perPage = 15;
        $page = $request->input('page', 1);

        $posts = Post::with(['user:id,name', 'category:id,name', 'tags:id,name'])
            ->orderBy('created_at', 'desc')
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get();

        $hasMorePosts = $posts->count() === $perPage;

        return PostResource::collection($this->addLikesAndFavs($posts));
    }

    public function trending(Request $request)
    {
        $perPage = 15;
        $page = $request->input('page', 1);

        $twentyFourHoursAgo = now()->subHours(24);

        $posts = Post::with(['user:id,name', 'category:id,name', 'tags:id,name'])
            ->where('created_at', '>=', $twentyFourHoursAgo)
            ->orderBy('likes', 'desc')
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get();

        $hasMorePosts = $posts->count() === $perPage;

        return PostResource::collection($this->addLikesAndFavs($posts));
    }

    public function show(Request $request)
    {
        $user = auth()->user();
        $roles = $user->roles->pluck('name');

        if ($request->has('postId')) {
            $postId = $request->postId;
            $posts = Post::with(['user', 'comments', 'comments.user', 'comments.comment', 'category'])
                ->where('id', $postId)
                ->get();

            $isFavourite = Favourite::where('user', $user->id)
                ->where('post_id', $request->postId)
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

    public function top()
    {
        $posts = Post::with(['user:id,name', 'category:id,name', 'tags:id,name'])
            ->orderBy('likes', 'desc')
            ->take(15)
            ->get();

        return PostResource::collection($this->addLikesAndFavs($posts));
    }

    /*
    public function upload(Request $request)
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
    */
    public function upload(Request $request)
    {
        // Pobieranie danych z formularza
        $image = $request->file('image'); // Pobieramy przesłane zdjęcie
        $title = $request->input('title');
        $text = $request->input('text');
        $category = $request->input('category');
        $tags = $request->input('tags');

        // Przetwarzanie zdjęcia (możesz go zapisać w odpowiednim miejscu)
        if ($image) {
            $imagePath = $image->store('images'); // Przykładowa ścieżka do zapisu zdjęcia
        }

        // Teraz możesz pracować z pobranymi danymi, w tym z zapisanym zdjęciem.

        // ...

        // Zwracanie odpowiedzi
        if ($request->input('image') == null) {
            return response()->json(['message' => $image->getClientOriginalName()]);
        } else {
            return response()->json(['msg' => 'No image uploaded.'], 400);
        }

    }

    public function store(Request $request)
    {

        /* if ($request->hasFile('image') &&
             ($request->title != null) && ($request->title != '') &&
             ($request->text != null) && ($request->text != '') &&
             ($request->category != null) && ($request->category != 0) &&
             ($request->tags != null) && ($request->tags != '')) {
**/

        $image = $request->file('image');
        //$image = $request->input('image');
        $imageName = auth()->user()->id.time().'_'.$image->getClientOriginalName();
        $image->move(public_path('images'), $imageName);

        //$image = $request->file('image');
        /*
                    if($image == null)
                    {
                        dd($request->input('image')->getClientOriginalName());
                    }
                    */

        $post = new Post();
        $post->user_id = auth()->user()->id;
        $post->title = $request->input('title');
        $post->text = $request->input('text');
        $post->likes = 0;
        $post->category_id = $request->input('category');
        $post->tag_list_id = 0;
        $post->path_to_image = $imageName;
        $post->created_at = now();
        $post->updated_at = now();
        $post->save();

        if ($post->save()) {
            return response()->json(['msg' => 'Success'], 201);
        } else {

            return response()->json(['msg' => 'Error'], 500);
        }

        return response()->json(['msg' => 'No image uploaded.'], 400);

        /* } else {
             return response()->json(['msg' => 'error while saving post, refresh or try later'], 500);
         }
         */
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
                'is_liked' => $article->liked(),

            ]);
        } else {
            return response()->json(['msg' => 'error while saving like, refresh or try later'], 500);
        }
    }

    public function favourite(Request $request)
    {
        if (($request->post != null) && ($request->post != 0)) {
            $favouriteRecord = Favourite::where('user_id', auth()->user()->id)
                ->where('post_id', $request->post)
                ->first();

            if ($favouriteRecord == true) {
                Favourite::find($favouriteRecord->id)->forceDelete();

                return response()->json(['message' => 'removed']);

            } else {
                $tmp = new Favourite();

                $tmp->user_id = auth()->user()->id;
                $tmp->post_id = $request->post;

                $tmp->created_at = now();
                $tmp->updated_at = now();

                $tmp->save();
                if ($tmp->save()) {

                    return response()->json(['message' => 'added'], 201);
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
