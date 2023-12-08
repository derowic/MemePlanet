<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\NotificationResource;
use App\Models\Comment;
use App\Models\Favourite;
use App\Models\Notification;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $perPage = 7;
        $page = $request->input('page', 1);

        $notificationsSeen0 = Notification::with(['sender:id,name'])
            ->where('receiver_id', auth()->user()->id)
            ->where('seen', 0)
            ->orderBy('created_at', 'desc')
            ->get();

        if ($notificationsSeen0->count() < $perPage) {
            $remainingCount = $perPage - $notificationsSeen0->count();
            $notificationsRest = Notification::with(['sender:id,name'])
                ->where('receiver_id', auth()->user()->id)
                ->where('seen', '!=', 0)
                ->orderBy('created_at', 'desc')
                ->take($remainingCount)
                ->get();
            $notificationsRest->load('sender');

            $notifications = $notificationsSeen0->concat($notificationsRest);
        } else {
            $notifications = $notificationsSeen0;
        }

        //return response()->json(['data' => $notifications], 201);
        return NotificationResource::collection($notifications);
    }

    public function store(Request $request)
    {
        $tmp = 0;
        if ($request->input('type') == 'post-comment') {
            $tmp = Post::find($request->input('element_id'))->user_id;
        } elseif ($request->input('type') == 'comment-comment') {
            $tmp = Comment::find($request->input('element_id'))->user_id;
        }

        if ($tmp == auth()->user()->id) {
            return response()->json(201);
        }

        $notification = new Notification();
        $notification->sender_id = auth()->user()->id;
        $notification->receiver_id = $tmp;
        $notification->type = $request->input('type');
        $notification->element_id = $request->input('element_id');
        $notification->seen = false;
        $notification->created_at = now();
        $notification->updated_at = now();
        $notification->save();

        if ($notification->save()) {
            return response()->json(201);
        } else {
            return response()->json(['message' => trans('notifications.Error while adding notification')], 500);
        }
    }

    public function show(Notification $notification): Response
    {
        $posts = null;
        if ($notification->type == 'comment-comment') {
            $postID = Comment::find($notification->element_id)->post->id;

            $posts = Post::with(['user:id,name', 'category:id,name', 'tags'])
                ->where('id', $postID)
                ->get();
        } elseif ($notification->type == 'post-comment') {
            $posts = Post::with(['user:id,name', 'category:id,name', 'tags'])
                ->where('id', $notification->element_id)
                ->get();
        }
        $notification->seen = 1;
        $notification->save();

        $favouriteRecord = Favourite::where('user_id', auth()->user()->id)
            ->where('post_id', $posts[0])
            ->first();
        if ($posts->count() > 0) {
            return Inertia::render('OnePostShow', [
                'post' => $posts[0],
                'tags' => Tag::all(),
                'isFav' => $favouriteRecord,
            ]);
        }
    }
}
