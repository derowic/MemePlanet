<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use App\Http\Resources\TagResource;

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
