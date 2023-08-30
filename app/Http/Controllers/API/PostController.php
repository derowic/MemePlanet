<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;

use App\Models\Announcment;
use App\Models\Post;
use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\Notification;
use App\Models\Favourite;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $user = auth()->user();
        $roles = $user->roles->pluck('name');

        $perPage = 5; // Ilość postów na stronę
        $posts = Post::with(['user'])->orderBy('created_at', 'desc')->with('user')->paginate($perPage);
        
        
        //$posts = Post::with(['user', 'comments'])->orderBy('created_at', 'desc')->paginate($perPage);
        $posts = Post::with(['user', 'comments', 'comments.user', 'comments.replyTo'])
        ->orderBy('created_at', 'desc')
        ->paginate($perPage);


        $user = auth()->user();
        // Załóżmy, że użytkownik jest zalogowany
        $favouriteRecords = $user->favourites;
        // Możesz również przekazywać dodatkowe informacje związane z postami, używając relacji
        $favouriteRecordsWithPosts = $user->favourites->pluck('idPost');


        return response()->json([
            'posts' => $posts,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $roles,
            ],
            'fav' => $favouriteRecordsWithPosts
        ]);
    }

    

    public function uploadImage(Request $request)
    {
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('images'), $imageName);
            
            return response()->json([
                'imageUrl' => '/images/' . $imageName,
            ]);
        }

        return response()->json(['message' => 'No image uploaded.'], 400);
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
            'like' => $article->likeCount ,

        ]);
    }

    public function create()
    {
        return view(
            'posts.create'
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            //'pathToImage' => 'required|mimes:jpg,png,jpeg|max:5048'
        ]);

         $title = $request->title;
         $description = $request->description;

        //  $newImageName = uniqid() . '-' . $request->title . '.' . $request->pathToImage->extension();
        //  $pathToImage = $request->pathToImage->move(public_path('images'), $newImageName);
        $pathToImage = $request->pathToImage;
        //$pathToImage=$request->pathToImage->file('pathToImage')->store('posts');
        $post = new Post();
        
        $post->idUser = auth()->user()->id;
        $post->title = $title;
        $post->likes = 0;
        $post->pathToImage = $pathToImage;
        $post->description = $description;
        $post->created_at = now();
        $post->updated_at = now();
 
        $post->save();

        return redirect('dashboard');
    }

    /**
     * Display the specified resource.
     */
    public function addToFavourite(Request $request)
    {

        

        $favouriteRecord = Favourite::where('idUser', auth()->user()->id)
            ->where('idPost',  $request->idPost)
            ->first();
            
            

        if($favouriteRecord == true)
        {
            Favourite::find($favouriteRecord->id)->forceDelete();
            return response()->json(
            [
                'message' => 'Delete favourite',
                
            ]);
                
        }
        else
        {
            $tmp = new Favourite();
            
            $tmp->idUser = auth()->user()->id;
            $tmp->idPost = $request->idPost;
            
            $tmp->created_at = now();
            $tmp->updated_at = now();

            $tmp->save();
            if ($tmp->save()) {
                // Udało się zapisać rekord
                return response()->json(
                    [
                        'message' => 'Add to favourite: Success',
                        'id' => $request->idPost
                    ], 201);
            }
            else
            {
                return response()->json(
                    [
                        'message' => 'Add to favourite: Fail',
                        'id' => $request->idPost
                    ], 500);
            
            }
        }
        
    }

    public function favourites()
    {
        $user = auth()->user();
        // Załóżmy, że użytkownik jest zalogowany
        $favouriteRecords = $user->favourites;
        // Możesz również przekazywać dodatkowe informacje związane z postami, używając relacji
        $favouriteRecordsWithPosts = $user->favourites()->with('post')->get();

        return response()->json(
        [
            'fav' => $favouriteRecordsWithPosts,
        ]);
    }

    

    
    public function destroy($id)
    {   
        Post::find($id)->forceDelete();
  
        return back();
    }

    public function softDeletePost(string $id) 
    {
        $id = Post::find($id);     
        $id->delete();
        return redirect('posts');
    }

   
}
