<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{

    public function getTags()
    {
        $tags = Tag::all();
        return response()->json([
            'tags' => $tags,
        ]);
    }


    public function destroy($id)
    {

    }

    public function softDeletePost(string $id)
    {

    }

}
