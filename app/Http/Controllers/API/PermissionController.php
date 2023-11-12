<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index()
    {
        $permissions = Permission::all();

        return response()->json(['data' => $permissions], 201);
    }

    public function assignPermissions(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'permission_ids' => 'required|array',
        ]);

        $user = User::find($data['user_id']);
        $user->permissions()->sync($data['permission_ids']);

        return response()->json(['msg' => 'Permission assigned']);
    }
}
