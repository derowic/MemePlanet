<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Comment;
use App\Models\Notification;
use App\Models\Post;
use App\Models\ReportList;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AdminPanelController extends Controller
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

        $posts = Post::with(['user:id,name', 'category:id,name', 'tags', 'reports'])
            ->withCount('reports') // Oblicza liczbę raportów
            ->having('reports_count', '>', 0) // Warunek na ilość raportów większą od 0
            ->orderBy('reports_count', 'desc') // Sortuje według liczby raportów
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get();

        return PostResource::collection($this->addLikesAndFavs($posts));
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

        return PostResource::collection($this->addLikesAndFavs($posts));
    }

    public function postReports(Request $request)
    {
        $reports = ReportList::with(['report'])//DB::table('report_lists')
            ->select('report_id', DB::raw('COUNT(report_id) as count'))
            ->where('post_id', $request->input('post_id'))
            ->groupBy('report_id')
            ->get();
        /*
          $reports = ReportList::with(['report'])
            //->where('status', "main page")
            ->get();
         */

        if ($reports) {

            return response()->json(['data' => $reports], 201);
        } else {

            return response()->json(['msg' => 'error while saving comment, refresh or try later'], 500);
        }
    }

    public function store(Request $request)
    {

        $tmp = 0;
        if ($request->input('type') == 'post-comment') {
            $tmp = Post::find($request->input('element_id'))->user_id;
        } elseif ($request->input('type') == 'comment-comment') {
            $tmp = Comment::find($request->input('element_id'))->user_id;
        }

        $notification = new Notification();
        $notification->sender_id = auth()->user()->id;
        $notification->receiver_id = $tmp; //$request->input("type");
        $notification->type = $request->input('type');
        $notification->element_id = $request->input('element_id');
        // id posta do którego jest to komentarz lub id komentarza do którego sie odnosi
        $notification->seen = false;
        $notification->created_at = now();
        $notification->updated_at = now();

        $notification->save();

        if ($notification->save()) {

            return response()->json(['msg' => 'notification added'], 201);
        } else {

            return response()->json(['msg' => 'error while saving comment, refresh or try later'], 500);
        }
    }

    public function show(Notification $notification): Response
    {
        //dd($notification);
        $posts = null;

        if ($notification->type == 'comment-comment') {
            //dd($notification);
            $postID = Comment::find($notification->element_id)->post->id;

            $posts = Post::with(['user:id,name', 'category:id,name', 'tags'])
                ->where('id', $postID)
                ->get();
        } elseif ($notification->type == 'post-comment') {
            //dd($notification);
            //$postID = Comment::find($notification->element_id)->post->id;

            $posts = Post::with(['user:id,name', 'category:id,name', 'tags'])
                ->where('id', $notification->element_id)
                ->get();
        }

        $notification->seen = 1;
        $notification->save();

        if ($posts->count() > 0) {
            return Inertia::render('OnePostShow', [
                'post' => $posts[0],
                'tags' => Tag::all(),
            ]);
        } else {

        }
    }

    public function destroy($id)
    {

    }

    public function softDeletePost(string $id)
    {

    }
}
