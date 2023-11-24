<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getAdmins()
    {
        $users = User::whereHas('roles', function ($query) {
            $query->where('name', 'admin');
        })->with('roles', 'permissions')->get();

        return response()->json(['data' => $users], 200);
    }

    public function getModerators()
    {
        $users = User::whereHas('roles', function ($query) {
            $query->where('name', 'moderator');
        })->with('roles', 'permissions')->get();

        return response()->json(['data' => $users], 200);
    }

    public function getBannedUsers()
    {
        $users = User::with('permissions', 'roles', 'ban.ban')
            ->where('ban_list_id', '!=', 0)->get();

        return response()->json(['data' => $users], 200);
    }

    public function getAllUsers()
    {
        $users = User::with(['permissions', 'roles'])->get();

        return response()->json(['data' => $users], 201);
    }

    public function search(Request $request)
    {
        $query = $request->input('dane');

        if ($query) {
            $results = User::with('permissions', 'roles')
                ->where('name', 'LIKE', "%$query%")->get();
        } else {
            $results = [];
        }

        return response()->json(['data' => $results], 201);
    }

    public function searchById(Request $request)
    {
        $user = User::with('permissions', 'roles')->find($request->input('id'));

        return response()->json(['data' => $user], 201);
    }
}
