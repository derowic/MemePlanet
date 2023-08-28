<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;

use App\Models\Announcment;
use App\Models\Post;
use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\Notification;


class CommentController extends Controller
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

        $comments = Post::with(['user', 'comments', 'comments.user', 'comments.replyTo','comments.replyTo.user'])
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

    
    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $com = new Comment();
        
        $com->idUser = auth()->user()->id;
        $com->idPost = $request->idPost;
        $com->idParentComment = $request->idParentComment;
        $com->text = $request->text;
        $com->created_at = now();
        $com->updated_at = now();

        $com->save();

        
        if ($com->save()) {
            // Udało się zapisać rekord
            return response()->json(['message' => 'Komentarz został utworzony'], 201);
        } else {
            // Wystąpił błąd podczas zapisu rekordu
            return response()->json(['message' => 'Nie udało się utworzyć komentarza'], 500);
        }

        
        

        /*
        if($request->responseTo != null)
        {
            $com->responseTo = $request->responseTo ;
        }

        if($request->responseTo != null)
        {
            $com->responseTo = $request->responseTo ;
        }
        */
        
        
        


    }

    /**
     * Store a newly created resource in storage.
     */
    public function store()
    {
        
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
