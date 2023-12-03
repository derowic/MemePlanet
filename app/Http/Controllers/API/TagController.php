<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\TagResource;
use App\Models\Category;
use App\Models\Tag;

class TagController extends Controller
{
    public function index()
    {
        $tags = Tag::orderBy('use_count', 'desc')->get();

        return TagResource::collection($tags);
    }

    public function improveTag(Tag $tag)
    {
        $category = new Category();
        $category->name = $tag->name;
        $category->save();

        return response()->json(['message' => trans('notifications.Success, tag is now category')], 200);
    }
}
