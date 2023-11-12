<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\Tag;
use App\Models\TagList;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    private function addLikesAndFavs($posts)
    {
        $favoritePosts = auth()->user()->favourites;

        $posts->each(function ($post) use ($favoritePosts) {
            $post->is_favorite = $favoritePosts->contains('post_id', $post->id);
            $post->is_liked = $post->likes()->where('user_id', auth()->id())->exists();
        });

        return $posts;
    }

    public function index(Request $request)
    {
        $perPage = 5;
        $page = $request->input('page', 1);

        $posts = Post::with(['user:id,name', 'category:id,name', 'tags'])
            ->where('status', 'main page')
            ->orderBy('created_at', 'desc')
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get();

        return PostResource::collection(auth()->check() ? $this->addLikesAndFavs($posts) : $posts);
    }

    public function fresh(Request $request)
    {
        $perPage = 5;
        $page = $request->input('page', 1);

        $posts = Post::with(['user:id,name', 'category:id,name', 'tags'])
            ->orderBy('created_at', 'desc')
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get();

        $hasMorePosts = $posts->count() === $perPage;

        return PostResource::collection(auth()->check() ? $this->addLikesAndFavs($posts) : $posts);
    }

    public function trending(Request $request)
    {
        $perPage = 5;
        $page = $request->input('page', 1);

        $twentyFourHoursAgo = now()->subHours(24);

        $posts = Post::with(['user:id,name', 'category:id,name', 'tags'])
            ->where('created_at', '>=', $twentyFourHoursAgo)
            ->orderBy('likes', 'desc')
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get();

        $hasMorePosts = $posts->count() === $perPage;

        return PostResource::collection(auth()->check() ? $this->addLikesAndFavs($posts) : $posts);
    }

    public function top()
    {
        $posts = Post::with(['user:id,name', 'category:id,name', 'tags'])
            ->orderBy('likes', 'desc')
            ->take(4)
            ->get();

        return response()->json([
            'data' => $posts,

        ]);

        if (auth()->check()) {
            return PostResource::collection($this->addLikesAndFavs($posts));
        } else {
            return PostResource::collection($posts);
        }
    }

    public function show(Post $post): Response
    {
        return Inertia::render('OnePostShow', [
            'post' => $post->load('user', 'category', 'tags'),
            'tags' => Tag::all(),
        ]);
    }

    public function store(PostRequest $request)
    {
        $image = $request->file('image');
        $imageName = auth()->user()->id.time().'_'.$image->getClientOriginalName();
        $image->move(public_path('images'), $imageName);

        $post = new Post();
        $post->user_id = auth()->user()->id;
        $post->title = $request->input('title');
        $post->text = $request->input('text');
        $post->likes = 0;
        $post->category_id = $request->input('category');
        $post->path_to_image = $imageName;
        $post->created_at = now();
        $post->updated_at = now();
        $post->save();

        if ($request->input('tags')) {
            $tagsString = $request->input('tags');
            $tagsArray = explode(',', $tagsString);

            foreach ($tagsArray as $tagId) {
                $tagList = new TagList();
                $tagList->post_id = $post->id;
                $tagList->tag_id = $tagId;
                $tagList->save();
            }
        }

        if ($request->input('customTag')) {
            $customTagText = $request->input('customTag');
            $tagsArray = explode('#', $customTagText);
            $tagsArray = array_filter($tagsArray);

            foreach ($tagsArray as $tagName) {
                $tag = new Tag();
                $tag->name = $tagName;
                $tag->save();

                $tagList = new TagList();
                $tagList->post_id = $post->id;
                $tagList->tag_id = $tag->id;
                $tagList->save();
            }
        }

        if ($post->save()) {
            return response()->json(['msg' => 'Post added, wait in fresh to accept by moderators'], 201);
        } else {
            return response()->json(['msg' => 'Error while adding post'], 500);
        }

        return response()->json(['msg' => 'Error while adding post'], 400);
    }

    public function like(Request $request)
    {
        if ($request->has('like') && ($request->id != null) && ($request->id != 0)) {
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
                'like' => $article->likeCount,
                'is_liked' => $article->liked(),

            ]);
        } else {
            return response()->json(['msg' => 'Error while saving like'], 500);
        }
    }

    public function reportedPosts(Request $request)
    {
        $perPage = 5;
        $page = $request->input('page', 1);

        $posts = Post::with(['user:id,name', 'category:id,name', 'tags', 'reports'])
            ->withCount('reports')
            ->having('reports_count', '>', 0)
            ->orderBy('reports_count', 'desc')
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get();

        return PostResource::collection(auth()->check() ? $this->addLikesAndFavs($posts) : $posts);
    }

    public function hiddenPosts(Request $request)
    {
        $perPage = 5;
        $page = $request->input('page', 1);

        $posts = Post::with(['user:id,name', 'category:id,name', 'tags'])
            ->where('status', 'hide')
            ->orderBy('created_at', 'desc')
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get();

        return PostResource::collection(auth()->check() ? $this->addLikesAndFavs($posts) : $posts);
    }

    public function userPosts(Request $request)
    {
        $perPage = 15;
        $user = auth()->user();
        $page = $request->input('page', 1);

        $posts = Post::with(['user:id,name', 'category:id,name', 'tags'])
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get();

        $hasMorePosts = $posts->count() === $perPage;

        return PostResource::collection($this->addLikesAndFavs($posts));
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return response()->json(['msg' => 'Success deleting'], 201);
    }

    public function sendToMainPage(Post $post)
    {
        Post::where('id', ($post->id))->update([
            'status' => 'main page',
        ]);
        $p = Post::find($post->id);
        session()->flash('toast', 'Success');

        return response()->json(['msg' => 'Success, post sended to main page'], 201);
    }

    public function hidePost(Post $post)
    {
        Post::where('id', ($post->id))->update([
            'status' => 'hide',
        ]);

        return response()->json(['msg' => 'Success, post hidden'], 201);
    }
}
