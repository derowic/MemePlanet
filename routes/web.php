<?php

use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\CommentController;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\TagController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::post('/posts', [PostController::class, 'index']);
Route::post('/upload', [PostController::class, 'uploadImage']);
Route::post('/likePost', [PostController::class, 'like']);
Route::post('/addToFavourite', [PostController::class, 'addToFavourite']);
Route::post('/getTopPosts', [PostController::class, 'getTopPosts']);
Route::post('/getOnePost', [PostController::class, 'getOnePost']);

Route::post('/getComments', [CommentController::class, 'getComments']);
Route::post('/addComment', [CommentController::class, 'create']);
Route::post('/likeComment', [CommentController::class, 'like']);

Route::post('/getCategories', [CategoryController::class, 'getCategories']);

Route::post('/getTags', [TagController::class, 'getTags']);

Route::get('/getComments', [PostController::class, 'getComments']);
Route::get('/posts', [PostController::class, 'index']);
Route::get('/like', [CommentController::class, 'like']);
Route::get('/addToFavourite', [PostController::class, 'addToFavourite']);
Route::get('/getCategories', [CategoryController::class, 'getCategories']);
Route::get('/getTags', [TagController::class, 'getTags']);

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

Route::get('/OnePostView', function () {
    return Inertia::render('OnePostView');
})->middleware(['auth', 'verified'])->name('OnePostView');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/react', function () {
    return view('react');
});

require __DIR__.'/auth.php';
