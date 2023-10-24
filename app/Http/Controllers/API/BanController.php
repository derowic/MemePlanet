<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Ban;
//use App\Http\Requests\CategoryRequest;
use Illuminate\Http\Request;

class BanController extends Controller
{
    public function index()
    {
        $ban = Ban::all();

        return response()->json(['data' => $ban], 201);
    }

    public function getCategories()
    {
        $categories = Category::all();

        return response()->json([
            'categories' => $categories,
        ]);
    }

    public function create(Request $request)
    {

    }

    public function store()
    {

    }

    public function edit($id)
    {

    }

    public function destroy($id)
    {

    }

    public function softDeletePost(string $id)
    {

    }
}
