<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CheckAdminRole
{
    public function handle(Request $request, Closure $next)
    {
        $user = auth()->user();
        app()->setLocale(auth()->user()->lang);

        if ($user && $user->hasRole('admin')) {
            return $next($request);
        }

        inertia()->flash("info', 'You don't have permission");

        return Inertia::render('UnAuthorizedView', []);
    }
}
