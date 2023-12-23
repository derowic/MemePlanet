<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Ban;
use App\Models\BanList;
use App\Models\User;
use DateInterval;
use DateTime;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class BanController extends Controller
{
    public function index()
    {
        $ban = Ban::all();

        return response()->json(['data' => $ban], 201);
    }

    public function check()
    {
        $user = auth()->user();
        $banList = BanList::where('user_id', $user->id)->first();

        if (! $banList) {
            return response()->json([
                'data' => false,
            ]);
        }

        $currentDate = new DateTime();
        $targetDate = new DateTime($banList->created_at);
        $banDurationInDays = $banList->ban->ban_length;

        $interval = new DateInterval("P{$banDurationInDays}D");
        $targetDate->add($interval);

        if ($targetDate < $currentDate) {
            $banList->delete();
            $user->roles()->sync(Role::where('name', 'user')->first()->id);

            return response()->json([
                'data' => false, 201,
            ]);
        } elseif ($targetDate > $currentDate) {
            return response()->json([
                'data' => true, 201,
            ]);
        } else {
            return response()->json([
                'message' => 'Error',
            ]);
        }
    }

    public function banUser(Request $request)
    {
        if (! BanList::where('user_id', $request->input('user_id'))->first()) {

            $user = User::find($request->input('user_id'));
            $user->syncRoles(['observer']);
            $ban = new BanList();
            $ban->user_id = $request->input('user_id');
            $ban->ban_id = $request->input('ban_id');
            $ban->report_id = $request->input('report_id');
            $ban->save();
            $tmp = $user->update(['ban_list_id' => $ban->id]);

            if ($ban->save()) {
                return response()->json(['message' => trans('notifications.User banned')], 201);
            } else {
                return response()->json(['message' => trans('notifications.Error')], 500);
            }
        }

        return response()->json(['message' => trans('notifications.This user is already banned')], 201);
    }

    public function unBan(User $user)
    {
        $ban = BanList::where('user_id', $user->id)->first();
        if ($ban) {
            $ban->delete();
            $user->ban_list_id = null;
            $user->syncRoles(['user']);
            $user->save();


            return response()->json(['msg' => trans('notifications.User unbanned')], 201);
        }

        return response()->json(['msg' => trans('notifications.Not found user')], 201);

    }
}
