<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\NotificationResource;
use App\Models\Notification;
use App\Models\Post;
use App\Models\Comment;
use Illuminate\Http\Request;


class NotificationController extends Controller
{
    public function index(Request $request)
    {
        //$notifications = Notification::where();
        /*$notifications = Notification::with(['sender:id,name'])
            ->where('receiver_id',$request->input('id'))
            ->orderBy('created_at', 'asc')
            ->get();
            */
        $notifications = Notification::with(['sender:id,name'])
            ->where('receiver_id',auth()->user()->id)
            ->get();
        //$notifications = Notification::all();
        return response()->json(
            ['msg' => $notifications], 201);
        return NotificationResource::collection($notifications);
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

    public function destroy($id)
    {

    }

    public function softDeletePost(string $id)
    {

    }
}
