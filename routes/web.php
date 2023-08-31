<?php

use App\Http\Controllers\API\CommentController;
use App\Http\Controllers\API\ExampleController;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/api/get-data', [ExampleController::class, 'getData']);

Route::get('/api/posts', [PostController::class, 'index']);
Route::post('/api/upload', [PostController::class, 'uploadImage']);
Route::post('/api/likePost', [PostController::class, 'like']);
Route::post('/api/addToFavourite', [PostController::class, 'addToFavourite']);

Route::post('/api/getComments', [CommentController::class, 'getComments']);
Route::post('/api/addComment', [CommentController::class, 'create']);
Route::post('/api/likeComment', [CommentController::class, 'like']);

Route::get('/getComments', [PostController::class, 'getComments']);
Route::get('/posts', [PostController::class, 'index']);
Route::get('/like', [CommentController::class, 'like']);
Route::get('/addToFavourite', [PostController::class, 'addToFavourite']);
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/MemeGenerator', function () {
    return Inertia::render('MemeGenerator');
})->middleware(['auth', 'verified'])->name('MemeGenerator');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/react', function () {
    return view('react');
});

require __DIR__.'/auth.php';
