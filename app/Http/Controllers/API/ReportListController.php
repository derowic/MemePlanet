<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ReportList;
use Illuminate\Http\Request;

class ReportListController extends Controller
{
    public function index(Request $request)
    {

    }

    public function store(Request $request)
    {
        if (! ReportList::where('user_id', auth()->user()->id)->where('post_id', $request->input('post_id'))->first()) {
            $reportList = new ReportList();
            $reportList->post_id = $request->input('post_id');
            $reportList->report_id = $request->input('report_id');
            $reportList->user_id = auth()->user()->id;
            $reportList->save();

            if ($reportList->save()) {
                return response()->json(['msg' => 'Success'], 201);
            } else {
                return response()->json(['msg' => 'Error'], 500);
            }
        }

        return response()->json(['msg' => 'You have already reported this post'], 201);
    }

    public function destroy($id)
    {

    }

    public function softDeletereportList(string $id)
    {

    }
}
