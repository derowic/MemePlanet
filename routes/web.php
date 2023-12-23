<?php

use App\Http\Controllers\API\BanController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\CommentController;
use App\Http\Controllers\API\FavouriteController;
use App\Http\Controllers\API\NotificationController;
use App\Http\Controllers\API\PermissionController;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\ReportController;
use App\Http\Controllers\API\ReportListController;
use App\Http\Controllers\API\RoleController;
use App\Http\Controllers\API\TagController;
use App\Http\Controllers\API\UserController;
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
})->name('dashboard'); //middleware(['auth', 'verified'])->

Route::get('/unauthorized', function () {
    return Inertia::render('UnAuthorizedView');
})->name('unauthorized');

Route::get('/MemeGenerator', function () {
    return Inertia::render('MemeGenerator');
})->name('memeGenerator'); //middleware(['auth', 'verified'])->

Route::get('/setLang', [ProfileController::class, 'setLanguage'])->name('profile.setLang');

Route::get('/post', [PostController::class, 'index'])->name('post.index');
Route::get('/top', [PostController::class, 'top'])->name('post.top');
Route::get('/trending', [PostController::class, 'trending'])->name('post.trending');
Route::get('/fresh', [PostController::class, 'fresh'])->name('post.fresh');
Route::get('/show/{post}', [PostController::class, 'show'])->name('post.show');
Route::get('/post/categories', [PostController::class, 'postsFromCategories'])->name('post.categories');
Route::get('/post/{post}', [PostController::class, 'similar'])->name('post.similar');

Route::get('/category', [CategoryController::class, 'index'])->name('category.index');

Route::get('/tag', [TagController::class, 'index'])->name('tag.index');

Route::get('/tagList', [TagListController::class, 'index'])->name('tagListg.index');

Route::get('/api/roles', [RoleController::class, 'index'])->name('role.index');
Route::get('/api/permissions', [PermissionController::class, 'index'])->name('permission.index');

Route::get('/comment', [CommentController::class, 'index'])->name('comment.index');
Route::get('/comment/refresh', [CommentController::class, 'refresh'])->name('comment.refresh');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/notification', [NotificationController::class, 'index'])->name('notification.index');
    Route::get('/check', [BanController::class, 'check'])->name('ban.check');

    Route::middleware(['checkUserRole'])->group(function () {
        Route::get('/Account', function () {
            return Inertia::render('Account');
        })->middleware(['auth', 'verified'])->name('account');

        Route::get('/userPosts', [PostController::class, 'userPosts'])->name('post.userPosts');

        Route::post('/notification', [NotificationController::class, 'store'])->name('notification.store');
        Route::get('/notification/{notification}', [NotificationController::class, 'show'])->name('notification.show');
        Route::put('/notification/{notification}', [NotificationController::class, 'update'])->name('notification.update');
        Route::delete('/notification/{notification}', [NotificationController::class, 'delete'])->name('notification.delete');

        Route::post('/post', [PostController::class, 'store'])->name('post.store');
        Route::post('/like', [PostController::class, 'like'])->name('post.like');
        //Route::post('/post/fav', [PostController::class, 'favourite'])->name('post.fav');
        Route::put('/post/{post}', [PostController::class, 'update'])->name('post.update');
        Route::delete('/post/{post}', [PostController::class, 'delete'])->name('post.delete');
        Route::put('/restore/{post}', [PostController::class, 'restore'])->name('post.restore');
        Route::get('/deleted', [PostController::class, 'deletedPosts'])->name('post.deletedPosts');
        //Route::post('/report/{post}', [ReportController::class, 'report'])->name('report.report');

        Route::post('/comment', [CommentController::class, 'store'])->name('comment.store');
        Route::post('/comment/like', [CommentController::class, 'like'])->name('comment.like');
        Route::put('/comment/{comment}', [CommentController::class, 'update'])->name('comment.update');
        Route::delete('/comment/{comment}', [CommentController::class, 'delete'])->name('comment.delete');

        Route::get('/favourite', [FavouriteController::class, 'index'])->name('favourite.index');
        Route::post('/favourite', [FavouriteController::class, 'store'])->name('favourite.store');

        Route::put('/favourite/{favourite}', [FavouriteController::class, 'update'])->name('favourite.update');
        Route::delete('/favourite/{favourite}', [FavouriteController::class, 'delete'])->name('favourite.delete');

        Route::post('/tag', [TagController::class, 'store'])->name('tag.store');
        Route::put('/tag/{tag}', [TagController::class, 'update'])->name('tag.update');
        Route::delete('/tag/{tag}', [TagController::class, 'delete'])->name('tag.delete');

        Route::post('/reportList', [ReportListController::class, 'store'])->name('reportList.store');
        Route::get('/report', [ReportController::class, 'index'])->name('report.index');

        /*
        Route::post('/tagList', [TagListController::class, 'store'])->name('tagList.store');
        Route::put('/tagList/{tagList}', [TagListController::class, 'update'])->name('tagList.update');
        Route::delete('/tagList/{tagList}', [TagListController::class, 'delete'])->name('tagList.delete');
        */

    });

    Route::middleware(['checkModeratorRole'])->group(function () {
        Route::put('/hdie/{post}/hide', [PostController::class, 'hidePost'])->name('post.hidePost');
        Route::put('/hdie/{post}/unHide', [PostController::class, 'unHidePost'])->name('post.unHidePost');

        Route::middleware(['checkAdminRole'])->group(function () {

            Route::get('/AdminPanel', function () {
                return Inertia::render('AdminPanel/AdminPanel');
            })->middleware(['auth', 'verified'])->name('adminPanel');

            Route::get('/RoleAndPermissions', function () {
                return Inertia::render('AdminPanel/RoleAndPermissions');
            })->middleware(['auth', 'verified'])->name('RoleAndPermissions');

            Route::get('/EditCategoriesAndTags', function () {
                return Inertia::render('AdminPanel/EditCategoriesAndTags');
            })->middleware(['auth', 'verified'])->name('EditCategoriesAndTags');

            Route::get('/getAdmins', [UserController::class, 'getAdmins'])->name('user.getAdmins');
            Route::get('/getModerators', [UserController::class, 'getModerators'])->name('user.getModerators');
            Route::get('/getBannedUsers', [UserController::class, 'getBannedUsers'])->name('user.getBannedUsers');

            Route::get('/reportedPosts', [PostController::class, 'reportedPosts'])->name('post.reportedPosts');
            Route::get('/hiddenPosts', [PostController::class, 'hiddenPosts'])->name('post.hiddenPosts');

            Route::put('/post/mainPage/{post}', [PostController::class, 'sendToMainPage'])->name('post.mainPage');
            Route::put('/post/takeFromMainPage/{post}', [PostController::class, 'postTakenFromMainPage'])->name('post.takeFromMainPage');

            //Route::put('/hdie/{post}/hide', [PostController::class, 'hidePost'])->name('post.hidePost');
            //Route::put('/hdie/{post}/unHide', [PostController::class, 'unHidePost'])->name('post.unHidePost');

            Route::delete('/admin/{post}/delete', [PostController::class, 'destroy'])->name('post.destroy');

            Route::delete('/deleteComment/{comment}/delete', [CommentController::class, 'destroy'])->name('comment.destroy');

            Route::post('/ban', [BanController::class, 'banUser'])->name('ban.banUser');
            Route::get('/ban', [BanController::class, 'index'])->name('ban.index');
            Route::post('/unBan/{user}', [BanController::class, 'unBan'])->name('ban.unBan');

            Route::get('/api/users', [UserController::class, 'getAllUsers'])->name('user.getAllUsers');
            Route::get('/search', [UserController::class, 'search'])->name('user.search');
            Route::get('/searchById', [UserController::class, 'searchById'])->name('user.searchById');

            Route::put('/improveTag/{tag}', [TagController::class, 'improveTag'])->name('tag.improveTag');
            Route::delete('/deleteCategory/{category}', [CategoryController::class, 'destroy'])->name('category.destroy');

            Route::post('/category', [CategoryController::class, 'store'])->name('category.store');
            Route::put('/category/{category}', [CategoryController::class, 'update'])->name('category.update');
            Route::delete('/category/{category}', [CategoryController::class, 'delete'])->name('category.delete');

            Route::get('/reportList', [ReportListController::class, 'index'])->name('reportList.index');

            Route::post('/api/assign-permissions', [PermissionController::class, 'assignPermissions'])->name('permission.assignPermissions');

            Route::post('/api/assign-roles', [RoleController::class, 'assignRoles'])->name('role.assignRoles');

        });
    });
});

Route::get('/react', function () {
    return view('react');
});

require __DIR__.'/auth.php';
