<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

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
