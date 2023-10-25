<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\BanList;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::all();

        return response()->json(['data' => $roles], 201);
    }

    public function assignRoles(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'role_ids' => 'required|array',
        ]);

        $user = User::find($request->input('user_id'));

        if (!$user) {
            return response()->json(['msg' => 'Użytkownik nie istnieje'], 404);
        }

        $roleIds = $request->input('role_ids');

        // Przypisz wybrane role do użytkownika
        $user->roles()->sync($roleIds);

        return response()->json(['msg' => 'Role zostały przypisane pomyślnie']);
    }
}
