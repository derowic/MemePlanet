<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\Tag;
use App\Models\TagList;
use App\Repositories\PostRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    protected $postRepository;

    protected $perPage = 12;

    public function __construct(PostRepository $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    public function postsFromCategories(Request $request)
    {
        $page = $request->input('page', 1);
        $categories = $request->input('chosenCategory', []);

        $posts = Post::with(['user:id,name', 'category:id,name', 'tags'])
            ->where('status', 'main page')
            ->when(! empty($categories), function ($query) use ($categories) {
                return $query->whereIn('category_id', $categories);
            })
            ->where('status', '<>', 'deleted')
            ->orderBy('created_at', 'desc')
            ->skip(($page - 1) * $this->perPage)
            ->take($this->perPage)
            ->get();

        return PostResource::collection(auth()->check() ? $this->postRepository->addLikesAndFavs($posts) : $posts);
    }

    public function index(Request $request)
    {

        $page = $request->input('page', 1);
        $categories = $request->input('chosenCategory', []);

        $posts = Post::with(['user:id,name', 'category:id,name', 'tags'])
            ->where('status', 'main page')
            ->when(! empty($categories), function ($query) use ($categories) {
                return $query->whereIn('category_id', $categories);
            })
            ->where('status', '<>', 'deleted')
            ->orderBy('created_at', 'desc')
            ->skip(($page - 1) * $this->perPage)
            ->take($this->perPage)
            ->get();

        return PostResource::collection(auth()->check() ? $this->postRepository->addLikesAndFavs($posts) : $posts);
    }

    public function similar(Post $post)
    {
        $desiredTags = $post->tags()->pluck('tag_id')->values()->all();
        $posts = Post::with(['user:id,name', 'category:id,name', 'tags:tag_id'])
            ->where('category_id', '=', $post->category->id)
            ->where('status', '<>', 'deleted')
            ->where('status', '<>', 'hide')
            ->where('id', '<>', $post->id)
            ->whereHas('tags', function ($query) use ($desiredTags) {
                $query->whereIn('tag_id', $desiredTags);
            })
            ->take($this->perPage)
            ->get();

        if ($posts->count() <= 0) {
            $posts = Post::where('title', 'like', '%'.$post->title.'%')
                ->whereNotIn('id', [$post->id])
                ->take($this->perPage)
                ->get();
            if ($posts->count() <= 0) {
                $posts = Post::where('text', 'like', '%'.$post->text.'%')
                    ->whereNotIn('id', [$post->id])
                    ->take($this->perPage)
                    ->get();
            }
        }

        return PostResource::collection(auth()->check() ? $this->postRepository->addLikesAndFavs($posts) : $posts);
    }

    public function fresh(Request $request)
    {

        $page = $request->input('page', 1);
        $categories = $request->input('chosenCategory', []);

        $posts = Post::with(['user:id,name', 'category:id,name', 'tags'])
            ->when(! empty($categories), function ($query) use ($categories) {
                return $query->whereIn('category_id', $categories);
            })
            ->where('status', '<>', 'deleted')
            ->orderBy('created_at', 'desc')
            ->skip(($page - 1) * $this->perPage)
            ->take($this->perPage)
            ->get();

        $hasMorePosts = $posts->count() === $this->perPage;

        return PostResource::collection(auth()->check() ? $this->postRepository->addLikesAndFavs($posts) : $posts);
    }

    public function trending(Request $request)
    {

        $page = $request->input('page', 1);
        $categories = $request->input('chosenCategory', []);

        $twentyFourHoursAgo = now()->subHours(24);

        $posts = Post::with(['user:id,name', 'category:id,name', 'tags'])
            ->when(! empty($categories), function ($query) use ($categories) {
                return $query->whereIn('category_id', $categories);
            })
            ->where('status', '=', 'main page')
            ->where('status', '<>', 'deleted')
            ->where('created_at', '>=', $twentyFourHoursAgo)
            ->orderBy('likes', 'desc')
            ->skip(($page - 1) * $this->perPage)
            ->take($this->perPage)
            ->get();

        $hasMorePosts = $posts->count() === $this->perPage;

        return PostResource::collection(auth()->check() ? $this->postRepository->addLikesAndFavs($posts) : $posts);
    }

    public function top(Request $request)
    {

        $page = $request->input('page', 1);
        $categories = $request->input('chosenCategory', []);

        $posts = Post::with(['user:id,name', 'category:id,name', 'tags'])
            ->when(! empty($categories), function ($query) use ($categories) {
                return $query->whereIn('category_id', $categories);
            })
            ->where('status', '=', 'main page')
            ->where('status', '<>', 'deleted')
            ->orderBy('likes', 'desc')
            ->skip(($page - 1) * $this->perPage)
            ->take($this->perPage)
            ->get();

        if (auth()->check()) {
            return PostResource::collection($this->postRepository->addLikesAndFavs($posts));
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

    public function deletedPosts(Request $request)
    {

        $page = $request->input('page', 1);
        $categories = $request->input('chosenCategory', []);

        $posts = Post::with(['user:id,name', 'category:id,name', 'tags'])
            ->where('status', 'deleted')
            ->when(! empty($categories), function ($query) use ($categories) {
                return $query->whereIn('category_id', $categories);
            })
            ->orderBy('created_at', 'desc')
            ->skip(($page - 1) * $this->perPage)
            ->take($this->perPage)
            ->get();

        return PostResource::collection(auth()->check() ? $this->postRepository->addLikesAndFavs($posts) : $posts);
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
        $post->status = 'waiting';
        $post->category_id = $request->input('category');
        $post->path_to_image = $imageName;
        $post->created_at = now();
        $post->updated_at = now();
        $post->save();

        if ($request->input('tags')) {
            $tagsString = $request->input('tags');
            $tagsArray = explode(',', $tagsString);

            foreach ($tagsArray as $tagId) {
                $tag = Tag::find($tagId);
                $tag->use_count = ((($tag->use_count > 0) && ($tag->use_count != null)) ? $tag->use_count + 1 : 1);
                $tag->save();

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
                $tag = Tag::where('name', trim(strtolower($tagName)))->first();

                if ($tag) {
                    $tag->use_count = ((($tag->use_count > 0) && ($tag->use_count != null)) ? $tag->use_count + 1 : 1);
                    $tag->save();
                } else {
                    $tag = new Tag();
                    $tag->name = strtolower($tagName);
                    $tag->use_count = 1;
                    $tag->save();
                }
                $tagList = new TagList();
                $tagList->post_id = $post->id;
                $tagList->tag_id = $tag->id;
                $tagList->save();

            }
        }

        if ($post->save()) {
            return response()->json(['message' => trans('notifications.Post added, wait in fresh to accept by moderators')], 201);
        } else {
            return response()->json(['message' => trans('notifications.Error while adding post')], 500);
        }

        return response()->json(['message' => trans('notifications.Error while adding post')], 400);
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
            return response()->json(['message' => trans('notifications.Error while saving like')], 500);
        }
    }

    public function reportedPosts(Request $request)
    {

        $page = $request->input('page', 1);
        $categories = $request->input('chosenCategory', []);

        $posts = Post::with(['user:id,name', 'category:id,name', 'tags', 'reports'])
            ->when(! empty($categories), function ($query) use ($categories) {
                return $query->whereIn('category_id', $categories);
            })
            ->withCount('reports')
            ->having('reports_count', '>', 0)
            ->orderBy('reports_count', 'desc')
            ->skip(($page - 1) * $this->perPage)
            ->take($this->perPage)
            ->get();

        return PostResource::collection(auth()->check() ? $this->postRepository->addLikesAndFavs($posts) : $posts);
    }

    public function hiddenPosts(Request $request)
    {

        $page = $request->input('page', 1);
        $categories = $request->input('chosenCategory', []);

        $posts = Post::with(['user:id,name', 'category:id,name', 'tags'])
            ->when(! empty($categories), function ($query) use ($categories) {
                return $query->whereIn('category_id', $categories);
            })
            ->where('status', 'hide')
            ->orderBy('created_at', 'desc')
            ->skip(($page - 1) * $this->perPage)
            ->take($this->perPage)
            ->get();

        return PostResource::collection(auth()->check() ? $this->postRepository->addLikesAndFavs($posts) : $posts);
    }

    public function userPosts(Request $request)
    {

        $user = auth()->user();
        $page = $request->input('page', 1);
        $categories = $request->input('chosenCategory', []);

        $posts = Post::with(['user:id,name', 'category:id,name', 'tags'])
            ->when(! empty($categories), function ($query) use ($categories) {
                return $query->whereIn('category_id', $categories);
            })
            ->where('status', '<>', 'deleted')
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->skip(($page - 1) * $this->perPage)
            ->take($this->perPage)
            ->get();

        $hasMorePosts = $posts->count() === $this->perPage;

        return PostResource::collection($this->postRepository->addLikesAndFavs($posts));
    }

    public function restore(Post $post)
    {
        Post::where('id', ($post->id))->update([
            'status' => 'waiting',
        ]);

        return response()->json(['message' => trans('notifications.Success, post restored')], 201);
    }

    public function destroy(Post $post)
    {
        Post::where('id', ($post->id))->update([
            'status' => 'deleted',
        ]);

        return response()->json(['message' => trans('notifications.Success, post deleted')], 201);
    }

    public function sendToMainPage(Post $post)
    {
        Post::where('id', ($post->id))->update([
            'status' => 'main page',
        ]);

        return response()->json(['message' => trans('notifications.Success, post sended to main page')], 201);

    }

    public function postTakenFromMainPage(Post $post)
    {
        if ($post->status == 'main page') {
            Post::where('id', ($post->id))->update([
                'status' => 'waiting',
            ]);

            return response()->json(['message' => trans('notifications.Success, post taken from page')], 201);
        }
    }

    public function hidePost(Post $post)
    {
        Post::where('id', ($post->id))->update([
            'status' => 'hide',
        ]);

        return response()->json(['message' => trans('notifications.Success, post hidden')], 201);
    }

    public function unHidePost(Post $post)
    {
        Post::where('id', ($post->id))->update([
            'status' => 'waiting',
        ]);

        return response()->json(['message' => trans('notifications.Success, post unhide')], 201);
    }
}
