<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class SystemController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Dashboard');
    }
}
