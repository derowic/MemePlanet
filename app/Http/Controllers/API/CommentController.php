<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index(Request $request)
    {
        $comments = Comment::with(['user:id,name', 'comment:id'])
            ->orderBy('created_at', 'asc')
            ->where('post_id', $request->id)
            ->get();

        return CommentResource::collection($comments);
    }

    public function getComments(Request $request)
    {
        if (($request->id != null) && ($request->id != 0)) {
            $postId = $request->id;

            $comments = Post::with(['comments', 'comments.user', 'comments.comment', 'comments.comment.user'])
                ->where('id', $postId)
                ->orderBy('created_at', 'desc')
                ->get();

            $user = auth()->user();

            return response()->json([
                'dane' => $comments,
                'id' => $postId,
                'user' => $user,

            ]);
        } else {
            return response()->json(['msg' => 'error while downloading comment, refresh or try later'], 500);
        }

    }

    public function like(Request $request)
    {
        if ($request->has('like') && ($request->id != null) && ($request->id != 0)) {
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

            return response()->json(['like' => $article->likeCount]);
        } else {
            return response()->json(['msg' => 'error while saving like, refresh or try later'], 500);
        }
    }

    public function store(Request $request)
    {
        $com = new Comment();
        $com->user_id = auth()->user()->id;
        $com->post_id = $request->post_id;
        $com->comment_id = $request->comment_id;
        $com->text = $request->text;
        $com->likes = 0;
        $com->created_at = now();
        $com->updated_at = now();

        $com->save();

        if ($com->save()) {

            return response()->json(['msg' => 'comment saved'], 201);
        } else {

            return response()->json(['msg' => 'error while saving comment, refresh or try later'], 500);
        }
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
