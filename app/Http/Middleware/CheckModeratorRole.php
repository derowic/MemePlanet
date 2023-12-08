<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CheckModeratorRole
{
    public function handle(Request $request, Closure $next)
    {
        $user = auth()->user();
        app()->setLocale(auth()->user()->lang);

        if ($user && $user->hasRole('moderator')) {
            return $next($request);
        }

        inertia()->flash("info', 'You don't have permission");

        return Inertia::render('UnAuthorizedView', []);
        //return response('Unauthorized action', 403);
    }
}
