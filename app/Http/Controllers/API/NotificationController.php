<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\NotificationResource;
use App\Models\Notification;
use App\Models\Post;
use App\Models\Comment;
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
            //->skip(($page - 1) * $perPage)
            //->take($perPage)
            ->get();

        if ($notificationsSeen0->count() < $perPage) {
            $remainingCount = $perPage - $notificationsSeen0->count();
            $notificationsRest = Notification::with(['sender:id,name'])
                ->where('receiver_id', auth()->user()->id)
                ->where('seen', '!=', 0)
                ->orderBy('created_at', 'desc')
                ->take($remainingCount)
                ->get();

            $notifications = $notificationsSeen0->concat($notificationsRest);
        } else {
            $notifications = $notificationsSeen0;
        }

        return response()->json(['notifications' => $notifications], 201);

        /*
        $perPage = 7;
        $page = $request->input('page', 1);

        $notifications = Notification::with(['sender:id,name'])
            ->where('receiver_id',auth()->user()->id)
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get();

        return response()->json(
            ['notifications' => $notifications], 201);
        return NotificationResource::collection($notifications);
        */
    }




    public function store(Request $request)
    {

        $tmp = 0;
        if($request->input("type") == "post-comment")
        {
            $tmp = Post::find($request->input("element_id"))->user_id;
        }
        else if($request->input("type") == "comment-comment")
        {
            $tmp = Comment::find($request->input("element_id"))->user_id;
        }

        $notification = new Notification();
        $notification->sender_id = auth()->user()->id;
        $notification->receiver_id = $tmp;//$request->input("type");
        $notification->type = $request->input("type");
        $notification->element_id = $request->input("element_id");
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

        if ($notification->type == "comment-comment") {
            //dd($notification);
            $postID = Comment::find($notification->element_id)->post->id;

            $posts = Post::with(['user:id,name', 'category:id,name', 'tags:id,name'])
                ->where('id', $postID)
                ->get();
        } elseif ($notification->type == "post-comment") {
            //dd($notification);
            $postID = Comment::find($notification->element_id)->post->id;

            $posts = Post::with(['user:id,name', 'category:id,name', 'tags:id,name'])
                ->where('id', $notification->element_id)
                ->get();
        }

        $notification->seen = 1;
        $notification->save();
        /*
        Notification::where($notification->id)->update([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
        ]);*/

        if ($posts->count() > 0) {
            return Inertia::render('OnePostShow', [
                'post' => $posts[0], // Przyjmujemy, że tylko jeden post zostanie znaleziony
                'tags' => Tag::all(),
            ]);
        } else {
            // Obsłuż przypadek, gdy nie znaleziono posta
            // Możesz tu zwrócić odpowiednią odpowiedź Inertia
            // lub obsłużyć to w dowolny inny sposób
        }
    }


    public function destroy($id)
    {

    }

    public function softDeletePost(string $id)
    {

    }
}
