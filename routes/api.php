<?php
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\TagController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\CommentController;
use App\Http\Controllers\ProfileController;
use Inertia\Inertia;

Route::get('/posts', [PostController::class, 'index']);
Route::post('/getTags', [TagController::class, 'getTags']);
Route::post('/upload', [PostController::class, 'uploadImage']);
Route::post('/likePost', [PostController::class, 'like']);
Route::post('/addToFavourite', [PostController::class, 'addToFavourite']);
Route::post('/getComments', [CommentController::class, 'getComments']);
Route::post('/addComment', [CommentController::class, 'create']);
Route::post('/likeComment', [CommentController::class, 'like']);
Route::post('/getCategories', [CategoryController::class, 'getCategories']);
Route::post('/getTags', [TagController::class, 'getTags']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
