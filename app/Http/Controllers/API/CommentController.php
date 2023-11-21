<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index(Request $request)
    {
        $comments = Comment::with(['user:id,name', 'comment:id'])
            ->orderBy('created_at', 'asc')
            ->where('post_id', $request->input('id'))
            ->get();

        return CommentResource::collection($comments);
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
            return response()->json(['msg' => 'Error while saving like'], 500);
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

        if ($com->save()) {
            return response()->json(['msg' => 'Comment added'], 201);
        } else {
            return response()->json(['msg' => 'Error while saving comment'], 500);
        }
    }




    public function destroy(Comment $comment)
    {
        $comment->delete();

        session()->flash('toast', 'Success');

        return response()->json(['msg' => 'Success deleting comment'], 201);
    }
}
