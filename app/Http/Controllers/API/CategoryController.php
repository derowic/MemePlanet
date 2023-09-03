<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function getCategories()
    {
        $categories = Category::all();
        return response()->json([
            'categories' => $categories,
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
            
            return response()->json(['message' => 'Success'], 201);
        } else {
            
            return response()->json(['message' => 'Fail'], 500);
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
        $data = Post::where('id', '=', $id)->first();

        return view('posts.edit', compact('data'));
    }

    public function update(Request $request, Post $post)
    {
        $id = $request->id;
        $title = $request->title;
        $description = $request->description;

        Post::where('id', '=', $id)->update([
            'title' => $title,
            'description' => $description,
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

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {

    }

    public function softDeletePost(string $id)
    {
        $post = Post::find($id);
        $post->delete();
    }

}
