<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Notification;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class CommentController extends Controller
{

    public function index()
    {
        $user = auth()->user();
        $roles = $user->roles->pluck('name');
        
        $perPage = 5; 
        $posts = Post::with(['user'])->orderBy('created_at', 'desc')->with('user')->paginate($perPage);
        $posts = Post::with(['user', 'comments', 'comments.user', 'comments.reply_to'])
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
        if(($request->id != null) && ($request->id != 0))
        {
            $postId = $request->id;

            $comments = Post::with(['comments', 'comments.user', 'comments.reply_to', 'comments.reply_to.user'])
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
        else
        {
            
            return response()->json(
                [
                   
                    'msg' => "error while downloading comment, refresh or try later",
                ], 500);
        }

    }

    public function create(Request $request)
    {
        if
        (
            ($request->post != null) && ($request->post != 0)
            &&
            ($request->parent_comment != "")
            &&
            ($request->text != null) && ($request->text != "")
        )
        {
            $com = new Comment();

            $com->user = auth()->user()->id;
            $com->post = $request->post;
            $com->parent_comment = $request->parent_comment;
            $com->text = $request->text;
            $com->likes = 0;
            $com->created_at = now();
            $com->updated_at = now();

            $com->save();

            if ($com->save()) {
                
                return response()->json(['msg' => "comment saved"], 201);
            } else {
            
                return response()->json(['msg' => "error while saving comment, refresh or try later"], 500);
            }
        }
        else
        {
            return response()->json(
                [
                   
                    'msg' => "error while saving comment, refresh or try later",
                ], 500);
        }

    }

    public function like(Request $request)
    {
        if
        (
            ($request->like != null)
            &&
            ($request->id != null) && ($request->id != 0)
        )
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
        else
        {
            return response()->json
            (
                [
                    'msg' => "error while saving like, refresh or try later",
                ]
            , 500);
        }
    }


    public function store()
    {

    }


    public function edit($id)
    {

    }


    public function destroy($id)
    {

    }

    public function softDeletePost(string $id)
    {

    }

}
