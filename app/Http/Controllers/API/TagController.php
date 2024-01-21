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
        // Post::where('id', '=', $request->id)->update([
        //     'likes' => $article->likeCount,
        // ]);
        $tmp = Category::where('name', $tag->name)->get();

        if($tmp->count() <= 0)
        {
            $category = new Category();
            $category->name = $tag->name;
            $category->save();

            return response()->json([
                'message' => trans('notifications.Success, tag is now category'),
                'tmp' => $tmp
            ], 200);
        }
        else
        {
            return response()->json([
                'message' => trans('notifications.That category already exist'),
                'tmp' => $tmp
            ], 200);
        }


    }
}
