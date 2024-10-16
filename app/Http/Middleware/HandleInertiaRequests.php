<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        //dd($request->user()->getAllPermissions());
        if ($request->user()) {
            return array_merge(parent::share($request), [

                'auth' => [

                    'user' => $request->user()->load('ban.ban', 'ban.report'),
                    'role' => $request->user()->getRoleNames(),
                    'permissions' => $request->user()->getAllPermissions()->pluck('name', 'id'),
                    'lang' => auth()->user()->lang,
                ],
                'ziggy' => function () use ($request) {
                    return array_merge((new Ziggy)->toArray(), [
                        'location' => $request->url(),
                    ]);
                },
                'toast' => [
                    'value' => fn () => $request->session()->get('toast'),
                ],
            ]);
        } else {
            return array_merge(parent::share($request), [

                'auth' => [

                    'user' => $request->user(),
                    //'role' => $request->user()->getRoleNames(),
                    //'permissions' => $request->user()->getAllPermissions(),
                    //'lang' => 'pl',
                ],
                'ziggy' => function () use ($request) {
                    return array_merge((new Ziggy)->toArray(), [
                        'location' => $request->url(),
                    ]);
                },
            ]);
        }
    }
}
