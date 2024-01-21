<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
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

        if (! $user) {
            return response()->json(['message' => trans("notifications.This user don't exist")], 404);
        }

        $roleIds = $request->input('role_ids');

        $user->roles()->sync($roleIds);

        return response()->json(['message' => trans('notifications.Roles assigned')]);
    }
}
