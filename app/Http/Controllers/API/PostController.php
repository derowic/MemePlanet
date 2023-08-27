<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;

use App\Models\Announcment;
use App\Models\Post;
use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\Notification;


class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        /*
        $search = $request['search'] ?? "";
        
        if ($search != "") {
            // where
            $posts = Post::where('title', 'LIKE', "%".$search."%")->orWhere('description', 'LIKE', "%".$search."%")->orderBy('created_at', 'desc')->with('user')->paginate(5);
        } else {
            $posts = Post::with(['user'])->orderBy('created_at', 'desc')->with('user')->paginate(5);
        }
        */
        /*
        $perPage = 5;
        $posts = Post::with(['user'])->orderBy('created_at', 'desc')->with('user')->paginate($perPage);
    
        $user = auth()->user();
        $roles = $user->roles->pluck('name'); // Przyjmuję, że role są zwracane jako kolekcja
    
        return response()->json([
            'posts' => $posts,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $roles,
            ],
        ]);
        */
        $user = auth()->user();
        $roles = $user->roles->pluck('name');

        $perPage = 5; // Ilość postów na stronę
        $posts = Post::with(['user'])->orderBy('created_at', 'desc')->with('user')->paginate($perPage);
        
        
        //$posts = Post::with(['user', 'comments'])->orderBy('created_at', 'desc')->paginate($perPage);
        $posts = Post::with(['user', 'comments', 'comments.user', 'comments.replyTo'])
        ->orderBy('created_at', 'desc')
        ->paginate($perPage);
    

        /*
        return response()->json([
            'posts' => $posts
        ]);
        */

       
        



        $user = auth()->user();
        $roles = $user->roles->pluck('name'); // Przyjmuję, że role są zwracane jako kolekcja
    
        return response()->json([
            'posts' => $posts,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $roles,
            ],
        ]);
        
        

        //return view('posts.index', compact(['posts', 'search']));
    }

    public function getComments(Request $request)
    {
        $postId = $request->id;

        $comments = Post::with(['user', 'comments', 'comments.user', 'comments.replyTo'])
            ->where('id', $postId)
            ->orderBy('created_at', 'desc')
            ->get();
/*
        $perPage = 5;
        $comments = Post::with(['user', 'comments', 'comments.user', 'comments.replyTo'])
        ->orderBy('created_at', 'desc')
        ->paginate($perPage);
        */
           

        return response()->json([
            'dane' => $comments,
            'id' => $postId,
            
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
        $article = Post::find(1);

        if ($like === true) {
            $article->like($myUserId);
            
        } else {
            $article->unlike($myUserId);
        }

        return response()->json([
            'like' => $article->likeCount ,

        ]);

       
        
        //
       
       // $article->unlike($myUserId); // pass in your own user id
        //$article->unlike(0); // 
        /*
         // like the article for current user
        $article->like($myUserId); // pass in your own user id
        $article->like(0); // just add likes to the count, and don't track by user

         // remove like from the article
        $article->unlike($myUserId); // pass in your own user id
        $article->unlike(0); // remove likes from the count -- does not check for user

        $article->likeCount; // get count of likes

        $article->likes; // Iterable Illuminate\Database\Eloquent\Collection of existing likes

        $article->liked(); // check if currently logged in user liked the article
        $article->liked($myUserId);

        Post::whereLikedBy($myUserId) // find only articles where user liked them
            ->with('likeCounter') // highly suggested to allow eager load
            ->get();
            */

       
        
    }






    /**
     * Show the form for creating a new resource.
     */
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
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $data = Post::where('id', '=', $id)->first();
        return view('posts.edit', compact('data'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $id = $request->id;
        $title = $request->title;
        $description = $request->description;

        Post::where('id', '=', $id)->update([
            'title' => $title,
            'description' => $description
        ]); 

        return redirect('posts');
    }

    public function one_post_view(int $id)
    {
        $post = Post::where('id', '=', $id)->first();
        $comments = Comment::where('idPost', $id)->with('user')->orderBy('created_at', 'asc')->get();

       
     


        return view('posts.one_post_view')
            ->with('post', $post)
            ->with('comments', $comments);
            
    }
    public function add_comment(Request $request)
    {
        

        //$pathToImage=$request->pathToImage->file('pathToImage')->store('posts');
        $com = new Comment();
        
        $com->idUser = auth()->user()->id;
        $com->idPost = $request->id;
        $com->text = $request->comment;
        $com->created_at = now();
        $com->updated_at = now();

        

        
        if($request->responseTo != null)
        {
            $com->responseTo = $request->responseTo ;
        }
        
        
        $com->save();


        $com = new Notification();
        //dd($request->post_author_id);
        $com->idUser = $request->post_author_id;
        $com->idPost = $request->id;
        $com->seen = false;
        $com->created_at = now();
        $com->updated_at = now();
        
        $com->save();
        
        return redirect('posts/one_post_view/'.strval($request->id));
        
    }

    /**
     * Remove the specified resource from storage.
     */
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

    public function showUploadForm()
    {
        return view('upload');
    }

    public function upload(Request $request)
    {
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);

            return 'Obrazek został przesłany i zapisany jako ' . $imageName;
        }

        return 'Brak obrazka do przesłania.';
    }
}
