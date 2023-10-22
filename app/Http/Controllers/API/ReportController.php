<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReportResource;
use App\Models\Report;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index()
    {
        $reports = Report::all();
        return ReportResource::collection($reports);
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
