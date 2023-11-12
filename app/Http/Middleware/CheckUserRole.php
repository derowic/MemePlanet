<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CheckUserRole
{
    public function handle(Request $request, Closure $next)
    {
        $user = auth()->user();

        if ($user && ($user->hasRole('user') || $user->hasRole('admin') || $user->hasRole('moderator'))) {
            return $next($request);
        }

        return Inertia::render('UnAuthorizedView', []);
        //return response('Unauthorized action', 403);
    }
}
