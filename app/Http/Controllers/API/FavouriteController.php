<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

class FavouriteController extends Controller
{
    public function index(Request $request)
    {

        $user = auth()->user();
        $favouriteRecords = $user->favourites;
        $favouriteRecordsWithPosts = $user->favourites()->with('post')->get();

        return response()->json(['fav' => $favouriteRecordsWithPosts]);
    }

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
