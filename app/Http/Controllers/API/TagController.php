<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\TagResource;
use App\Models\Tag;

class TagController extends Controller
{
    public function index()
    {
        $tags = Tag::all();

        return TagResource::collection($tags);
        /*
                return response()->json([
                    'tags' => $tags,
                ]);
                */
    }

    public function destroy($id)
    {

    }

    public function softDeletePost(string $id)
    {

    }
}
