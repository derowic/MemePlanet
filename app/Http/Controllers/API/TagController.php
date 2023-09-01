<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getTags()
    {
        $tags = Tag::all();
        return response()->json([
            'tags' => $tags,
        ]);

        //return view('posts.index', compact(['posts', 'search']));
    }

    public function getComments(Request $request)
    {
        $postId = $request->id;

        $comments = Post::with(['comments', 'comments.user', 'comments.replyTo', 'comments.replyTo.user'])
            ->where('id', $postId)
            ->orderBy('created_at', 'desc')
            ->get();
        /*
        $perPage = 5;
        $comments = Post::with(['user', 'comments', 'comments.user', 'comments.replyTo'])
        ->orderBy('created_at', 'desc')
        ->paginate($perPage);
        */

        $user = auth()->user();

        return response()->json([
            'dane' => $comments,
            'id' => $postId,
            'user' => $user,

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
        $com->likes = 0;
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

        //$pathToImage=$request->pathToImage->file('pathToImage')->store('posts');
        $com = new Comment();

        $com->idUser = auth()->user()->id;
        $com->idPost = $request->id;
        $com->text = $request->comment;
        $com->created_at = now();
        $com->updated_at = now();

        if ($request->responseTo != null) {
            $com->responseTo = $request->responseTo;
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
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);

            return 'Obrazek został przesłany i zapisany jako '.$imageName;
        }

        return 'Brak obrazka do przesłania.';
    }
}
