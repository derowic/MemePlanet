<?php

use App\Http\Controllers\API\AccountController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\CommentController;
use App\Http\Controllers\API\FavouriteController;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\TagController;
use App\Http\Controllers\API\TagListController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
Route::get('/category', [CategoryController::class, 'index'])->name('category.index');
Route::post('/category', [CategoryController::class, 'store'])->name('category.store');
Route::put('/category/{category}/update', [CategoryController::class, 'update'])->name('category.update');
Route::delete('/category/{category}', [CategoryController::class, 'delete'])->name('category.delete');
 */

//Route::get('/posts2', [PostController::class, 'index'])->name('post.index');;
//Route::post('/posts', [PostController::class, 'index']);
Route::post('/upload', [PostController::class, 'uploadImage']);
Route::post('/likePost', [PostController::class, 'like']);
Route::post('/addToFavourite', [PostController::class, 'addToFavourite']);
Route::post('/getTopPosts', [PostController::class, 'getTopPosts']);
Route::post('/getOnePost', [PostController::class, 'getOnePost']);

Route::post('/getComments', [CommentController::class, 'getComments']);
Route::post('/addComment', [CommentController::class, 'create']);
Route::post('/likeComment', [CommentController::class, 'like']);

Route::post('/getCategories', [CategoryController::class, 'getCategories']);

//Route::post('/getTags', [TagController::class, 'getTags']);

Route::post('/account_index', [AccountController::class, 'index']);

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
})->middleware(['auth', 'verified'])->name('memeGenerator');

Route::get('/Account', function () {
    return Inertia::render('Account');
})->middleware(['auth', 'verified'])->name('account');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware(['checkUserRole'])->group(function () {

    });

    Route::middleware(['checkAdminRole'])->group(function () {

    });
});

Route::get('/category', [CategoryController::class, 'index'])->name('category.index');
Route::post('/category', [CategoryController::class, 'store'])->name('category.store');
Route::put('/category/{category}', [CategoryController::class, 'update'])->name('category.update');
Route::delete('/category/{category}', [CategoryController::class, 'delete'])->name('category.delete');

Route::get('/post', [PostController::class, 'index'])->name('post.index');
Route::get('/top', [PostController::class, 'top'])->name('post.top');
Route::post('/post', [PostController::class, 'store'])->name('post.store');
Route::put('/post/{post}', [PostController::class, 'update'])->name('post.update');
Route::delete('/post/{post}', [PostController::class, 'delete'])->name('post.delete');

Route::get('/comment', [CommentController::class, 'index'])->name('comment.index');
Route::post('/comment', [CommentController::class, 'store'])->name('comment.store');
Route::put('/comment/{comment}', [CommentController::class, 'update'])->name('comment.update');
Route::delete('/comment/{comment}', [CommentController::class, 'delete'])->name('comment.delete');

Route::get('/favourite', [FavouriteController::class, 'index'])->name('favourite.index');
Route::post('/favourite', [FavouriteController::class, 'store'])->name('favourite.store');
Route::put('/favourite/{favourite}', [FavouriteController::class, 'update'])->name('favourite.update');
Route::delete('/favourite/{favourite}', [FavouriteController::class, 'delete'])->name('favourite.delete');

Route::get('/tag', [TagController::class, 'index'])->name('tag.index');
Route::post('/tag', [TagController::class, 'store'])->name('tag.store');
Route::put('/tag/{tag}', [TagController::class, 'update'])->name('tag.update');
Route::delete('/tag/{tag}', [TagController::class, 'delete'])->name('tag.delete');

Route::get('/tagList', [TagListController::class, 'index'])->name('taListg.index');
Route::post('/tagList', [TagListController::class, 'store'])->name('tagList.store');
Route::put('/tagList/{tagList}', [TagListController::class, 'update'])->name('tagList.update');
Route::delete('/tagList/{tagList}', [TagListController::class, 'delete'])->name('tagList.delete');

Route::get('/react', function () {
    return view('react');
});

require __DIR__.'/auth.php';
