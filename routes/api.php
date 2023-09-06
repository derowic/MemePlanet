<?php

use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\TagController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/api/posts', [PostController::class, 'index']);
Route::post('/api/getTags', [TagController::class, 'getTags']);
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
