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
        $posts = Post::with(['user'])->orderBy('created_at', 'desc')->with('user')->paginate($perPage);
        $posts = Post::with(['user', 'comments', 'comments.user', 'comments.replyTo','category'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        $favouriteRecords = $user->favourites;
        $favouriteRecordsWithPosts = $user->favourites->pluck('idPost');
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
            'test' => $successAttribute
        ]);
    }

    public function uploadImage(Request $request)
    {
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = auth()->user()->id.time().'_'.$image->getClientOriginalName();
            $image->move(public_path('images'), $imageName);

            $post = new Post();
            $post->idUser = auth()->user()->id;
            $post->title = $request->title;
            $post->text = $request->text;
            $post->likes = 0;
            $post->idCategory = $request->category;
            $post->idTags = "$request->tags";
            $post->pathToImage = $imageName;
            $post->created_at = now();
            $post->updated_at = now();
            $post->save();

            if ($post->save()) 
            {
                return response()->json([
                    'imageUrl' => '/images/'.$imageName,
                    'title' => $request->title,
                    'text' => $request->text,
                    'category' => $request->category,
                    'tags' => $request->tags,
                ],201);
            } 
            else 
            {
            
                return response()->json(['message' => 'Error'], 500);
            }

            return response()->json(['message' => 'No image uploaded.'], 400);
        }

        

      
    }

    public function like(Request $request)
    {
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
    }

    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

    }

    public function addToFavourite(Request $request)
    {

        $favouriteRecord = Favourite::where('idUser', auth()->user()->id)
            ->where('idPost', $request->idPost)
            ->first();

        if ($favouriteRecord == true) {
            Favourite::find($favouriteRecord->id)->forceDelete();

            return response()->json(
                [
                    'message' => 'Delete favourite',

                ]);

        } else {
            $tmp = new Favourite();

            $tmp->idUser = auth()->user()->id;
            $tmp->idPost = $request->idPost;

            $tmp->created_at = now();
            $tmp->updated_at = now();

            $tmp->save();
            if ($tmp->save()) {
             
                return response()->json(
                    [
                      
                        'id' => $request->idPost,
                    ], 201);
            } else {
                return response()->json(
                    [
                       
                        'id' => $request->idPost,
                    ], 500);

            }
        }

    }

    public function favourites()
    {
        $user = auth()->user();
        $favouriteRecords = $user->favourites;
        $favouriteRecordsWithPosts = $user->favourites()->with('post')->get();

        return response()->json(
        [
            'fav' => $favouriteRecordsWithPosts,
        ]);
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
