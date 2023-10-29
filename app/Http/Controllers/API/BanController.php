<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Ban;
use App\Models\BanList;
//use App\Http\Requests\CategoryRequest;
use DateTime;
use DateInterval;
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

        if (!$banList) {
            return response()->json([
                'data' => 'Użytkownik nie znaleziony na liście zbanowanych',
            ]);
        }

        $currentDate = new DateTime();
        $targetDate = new DateTime($banList->created_at);
        $banDurationInDays = $banList->ban->ban_length;

        $interval = new DateInterval("P{$banDurationInDays}D");
        $targetDate->add($interval);

        if ($targetDate < $currentDate) {
            $banList->delete();
            $user->roles()->sync(Role::where('name','user')->first()->id);
            return response()->json([
                'data' => 'Zakaz wygasł i został usunięty',
            ]);
        } elseif ($targetDate > $currentDate) {
            return response()->json([
                'data' => 'Użytkownik jest zbanowany',
            ]);
        } else {
            return response()->json([
                'data' => 'Nieoczekiwana sytuacja',
            ]);
        }
    }

}
