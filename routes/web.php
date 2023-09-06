<?php
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\CommentController;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\TagController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/react', function () {
    return view('react');
});

require __DIR__.'/auth.php';
