<?php

namespace App\Http\Controllers;

use App\Events\ChatMessage;
use Illuminate\Http\Request;
use App\Models\Message;

class ChatController extends Controller
{
    //
    public function sendMessage(Request $request)
    {
        $message = Message::create([
            'user' => $request->user,
            'message' => $request->message,
        ]);

        broadcast(new ChatMessage($message));

        return response()->json(['status' => 'success']);
    }

    public function getMessages()
    {
        return Message::latest()->get();
    }
}
