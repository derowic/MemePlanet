<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Notification;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{

    public function index()
    {
        $user = auth()->user();
        $roles = $user->roles->pluck('name');
        
        $perPage = 5; 
        $posts = Post::with(['user'])->orderBy('created_at', 'desc')->with('user')->paginate($perPage);
        $posts = Post::with(['user', 'comments', 'comments.user', 'comments.replyTo'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        $user = auth()->user();
        $roles = $user->roles->pluck('name'); 

        return response()->json([
            'posts' => $posts,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $roles,
            ],
        ]);

    }

    public function getComments(Request $request)
    {
        $postId = $request->id;

        $comments = Post::with(['comments', 'comments.user', 'comments.replyTo', 'comments.replyTo.user'])
            ->where('id', $postId)
            ->orderBy('created_at', 'desc')
            ->get();

        $user = auth()->user();

        return response()->json([
            'dane' => $comments,
            'id' => $postId,
            'user' => $user,

        ]);

    }

    public function create(Request $request)
    {
        $com = new Comment();

        $com->idUser = auth()->user()->id;
        $com->idPost = $request->idPost;
        $com->idParentComment = $request->idParentComment;
        $com->text = $request->text;
        $com->likes = 0;
        $com->created_at = now();
        $com->updated_at = now();

        $com->save();

        if ($com->save()) {
            
            return response()->json(['message' => 'Komentarz został utworzony'], 201);
        } else {
           
            return response()->json(['message' => 'Nie udało się utworzyć komentarza'], 500);
        }

    }

    public function like(Request $request)
    {
        $like = $request->like;
        $user = auth()->user();
        $myUserId = $user->id;
        $article = Comment::find($request->id);

        if ($like === true) {
            $article->like($myUserId);

        } else {
            $article->unlike($myUserId);
        }

        Comment::where('id', '=', $request->id)->update([
            'likes' => $article->likeCount,

        ]);

        return response()->json([
            'like' => $article->likeCount,

        ]);
    }


    public function store()
    {

    }

    public function show(string $id)
    {
       
    }

    public function edit($id)
    {

    }

    public function update(Request $request, Post $post)
    {

    }

    public function one_post_view(int $id)
    {

    }

    public function add_comment(Request $request)
    {

    }

    public function destroy($id)
    {

    }

    public function softDeletePost(string $id)
    {

    }

    public function showUploadForm()
    {

    }

    public function upload(Request $request)
    {

    }
}
