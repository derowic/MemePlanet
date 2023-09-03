<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{

    public function getTags()
    {
        $tags = Tag::all();
        return response()->json([
            'tags' => $tags,
        ]);
    }

    public function getComments(Request $request)
    {
        $id_post = $request->id;

        $comments = Post::with(['comments', 'comments.user', 'comments.reply_to', 'comments.reply_to.user'])
            ->where('id', $postId)
            ->orderBy('created_at', 'desc')
            ->get();

        $user = auth()->user();

        return response()->json([
            'dane' => $comments,
            'id' => $id_post,
            'user' => $user,

        ]);

    }

    public function create(Request $request)
    {
        $com = new Comment();
        $com->user = auth()->user()->id;
        $com->post = $request->post;
        $com->iparent_comment = $request->parent_comment;
        $com->text = $request->text;
        $com->likes = 0;
        $com->created_at = now();
        $com->updated_at = now();
        $com->save();

        if ($com->save()) 
        {
            return response()->json(['message' => 'Komentarz został utworzony'], 201);
        } else 
        {
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

}
