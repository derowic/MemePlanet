<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReportListRequest;
use App\Models\ReportList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportListController extends Controller
{
    public function index(Request $request)
    {
        $reports = ReportList::with(['report'])
            ->select('report_id', DB::raw('COUNT(report_id) as count'))
            ->where('post_id', $request->input('post_id'))
            ->groupBy('report_id')
            ->get();

        if ($reports) {
            return response()->json(['data' => $reports], 201);
        } else {
            return response()->json(['message' => 'error while saving comment, refresh or try later'], 500);
        }
    }

    public function store(ReportListRequest $request)
    {
        if (! ReportList::where('user_id', auth()->user()->id)->where('post_id', $request->input('post_id'))->first()) {
            $reportList = new ReportList();
            $reportList->post_id = $request->input('post_id');
            $reportList->report_id = $request->input('report_id');
            $reportList->user_id = auth()->user()->id;
            $reportList->save();

            if ($reportList->save()) {
                return response()->json(['message' => 'Thanks'], 201);
            } else {
                return response()->json(['message' => 'Error'], 500);
            }
        }

        return response()->json(['message' => 'You have already reported this post'], 200);
    }
}
