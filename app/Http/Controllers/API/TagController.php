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
        $tags = Tag::all();

        return TagResource::collection($tags);
    }

    public function improveTag(Tag $tag)
    {
        $category = new Category();
        $category->name = $tag->name;
        $category->save();

        $tag->delete();

        return response()->json(['msg' => 'Success, tag is now category'], 200);
    }
}
