<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\TagList;
use Illuminate\Http\Request;

class TagListController extends Controller
{
    public function index(Request $request)
    {
        $tagList = TagList::where('post_id', $request->input('id'))
            ->get();

        return TagResource::collection($tagList);
    }
}
