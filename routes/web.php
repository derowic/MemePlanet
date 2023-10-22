<?php

use App\Http\Controllers\API\AccountController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\CommentController;
use App\Http\Controllers\API\FavouriteController;
use App\Http\Controllers\API\NotificationController;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\TagController;
use App\Http\Controllers\API\TagListController;
use App\Http\Controllers\API\AdminAndModeratorController;
use App\Http\Controllers\API\ReportController;
use App\Http\Controllers\API\ReportListController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/account', [AccountController::class, 'index'])->name('account.index');

Route::get('/category', [CategoryController::class, 'index'])->name('category.index');
Route::post('/category', [CategoryController::class, 'store'])->name('category.store');
Route::put('/category/{category}', [CategoryController::class, 'update'])->name('category.update');
Route::delete('/category/{category}', [CategoryController::class, 'delete'])->name('category.delete');

Route::get('/notification', [NotificationController::class, 'index'])->name('notification.index');
Route::post('/notification', [NotificationController::class, 'store'])->name('notification.store');
Route::get('/notification/{notification}', [NotificationController::class, 'show'])->name('notification.show');
Route::put('/notification/{notification}', [NotificationController::class, 'update'])->name('notification.update');
Route::delete('/notification/{notification}', [NotificationController::class, 'delete'])->name('notification.delete');

Route::get('/post', [PostController::class, 'index'])->name('post.index');
Route::get('/top', [PostController::class, 'top'])->name('post.top');
Route::get('/trending', [PostController::class, 'trending'])->name('post.trending');
Route::get('/fresh', [PostController::class, 'fresh'])->name('post.fresh');
Route::post('/post', [PostController::class, 'store'])->name('post.store');
Route::post('/like', [PostController::class, 'like'])->name('post.like');
Route::post('/post/fav', [PostController::class, 'favourite'])->name('post.fav');
Route::post('/show', [PostController::class, 'show'])->name('post.show');
//Route::post('/upload', [PostController::class, 'upload'])->name('post.upload');
Route::put('/post/{post}', [PostController::class, 'update'])->name('post.update');
Route::delete('/post/{post}', [PostController::class, 'delete'])->name('post.delete');
Route::get('/onePost/{post}', [PostController::class, 'onePost'])->name('post.onePost');
Route::post('/report/{post}', [PostController::class, 'report'])->name('post.report');

Route::get('/comment', [CommentController::class, 'index'])->name('comment.index');
Route::post('/comment', [CommentController::class, 'store'])->name('comment.store');
Route::post('/comment/like', [CommentController::class, 'like'])->name('comment.like');
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

Route::post('/admin/{post}', [AdminAndModeratorController::class, 'sendToMainPage'])->name('admin.mainPage');
Route::post('/admin/{post}/hide', [AdminAndModeratorController::class, 'hidePost'])->name('admin.hidePost');
Route::delete('/admin/{post}/delete', [AdminAndModeratorController::class, 'deletePost'])->name('admin.deletePost');
Route::delete('/deleteComment/{comment}/delete', [AdminAndModeratorController::class, 'deleteComment'])->name('admin.deleteComment');

Route::get('/report', [ReportController::class, 'index'])->name('report.index');

Route::post('/reportList', [ReportListController::class, 'store'])->name('reportList.store');

Route::get('/react', function () {
    return view('react');
});

require __DIR__.'/auth.php';
