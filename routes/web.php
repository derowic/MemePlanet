<?php

use App\Http\Controllers\API\AccountController;
use App\Http\Controllers\API\AdminPanelController;
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
use App\Http\Controllers\API\TagListController;
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

Route::get('/post', [PostController::class, 'index'])->name('post.index');
Route::get('/top', [PostController::class, 'top'])->name('post.top');
Route::get('/trending', [PostController::class, 'trending'])->name('post.trending');
Route::get('/fresh', [PostController::class, 'fresh'])->name('post.fresh');
Route::post('/show', [PostController::class, 'show'])->name('post.show');
Route::get('/onePost/{post}', [PostController::class, 'onePost'])->name('post.onePost');

Route::get('/category', [CategoryController::class, 'index'])->name('category.index');

Route::get('/tag', [TagController::class, 'index'])->name('tag.index');

Route::get('/tagList', [TagListController::class, 'index'])->name('taListg.index');

Route::get('/api/roles', [RoleController::class, 'index'])->name('role.index');

Route::get('/api/permissions', [PermissionController::class, 'index'])->name('permission.index');

Route::get('/comment', [CommentController::class, 'index'])->name('comment.index');

Route::get('/ban', [BanController::class, 'index'])->name('ban.index');

Route::get('/report', [ReportController::class, 'index'])->name('report.index');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware(['checkUserRole'])->group(function () {
        Route::get('/Account', function () {
            return Inertia::render('Account/Account');
        })->middleware(['auth', 'verified'])->name('account');

        Route::get('/account', [AccountController::class, 'index'])->name('account.index');

        Route::get('/notification', [NotificationController::class, 'index'])->name('notification.index');
        Route::post('/notification', [NotificationController::class, 'store'])->name('notification.store');
        Route::get('/notification/{notification}', [NotificationController::class, 'show'])->name('notification.show');
        Route::put('/notification/{notification}', [NotificationController::class, 'update'])->name('notification.update');
        Route::delete('/notification/{notification}', [NotificationController::class, 'delete'])->name('notification.delete');

        Route::post('/post', [PostController::class, 'store'])->name('post.store');
        Route::post('/like', [PostController::class, 'like'])->name('post.like');
        Route::post('/post/fav', [PostController::class, 'favourite'])->name('post.fav');

        //Route::post('/upload', [PostController::class, 'upload'])->name('post.upload');
        Route::put('/post/{post}', [PostController::class, 'update'])->name('post.update');
        Route::delete('/post/{post}', [PostController::class, 'delete'])->name('post.delete');

        Route::post('/report/{post}', [PostController::class, 'report'])->name('post.report');


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

        Route::post('/tagList', [TagListController::class, 'store'])->name('tagList.store');
        Route::put('/tagList/{tagList}', [TagListController::class, 'update'])->name('tagList.update');
        Route::delete('/tagList/{tagList}', [TagListController::class, 'delete'])->name('tagList.delete');

    });

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

        Route::get('/adminPanel', [AdminPanelController::class, 'index'])->name('adminPanel.index');
        Route::get('/hide', [AdminPanelController::class, 'hiddenPosts'])->name('adminPanel.hiddenPosts');
        Route::get('/postReports', [AdminPanelController::class, 'postReports'])->name('adminPanel.postReports');
        Route::post('/admin/{post}', [AdminPanelController::class, 'sendToMainPage'])->name('admin.mainPage');
        Route::post('/admin/{post}/hide', [AdminPanelController::class, 'hidePost'])->name('admin.hidePost');
        Route::delete('/admin/{post}/delete', [AdminPanelController::class, 'deletePost'])->name('admin.deletePost');
        Route::delete('/deleteComment/{comment}/delete', [AdminPanelController::class, 'deleteComment'])->name('admin.deleteComment');
        Route::post('/ban', [AdminPanelController::class, 'banUser'])->name('admin.banUser');
        Route::get('/api/users', [AdminPanelController::class, 'getAllUsers'])->name('adminPanel.getAllUsers');
        Route::get('/search', [AdminPanelController::class, 'search'])->name('adminPanel.search');
        Route::get('/searchById', [AdminPanelController::class, 'searchById'])->name('adminPanel.searchById');
        Route::get('/getAdmins', [AdminPanelController::class, 'getAdmins'])->name('adminPanel.getAdmins');
        Route::get('/getModerators', [AdminPanelController::class, 'getModerators'])->name('adminPanel.getModerators');
        Route::get('/getBannedUsers', [AdminPanelController::class, 'getBannedUsers'])->name('adminPanel.getBannedUsers');
        Route::put('/improveTag/{tag}', [AdminPanelController::class, 'improveTag'])->name('adminPanel.improveTag');
        Route::post('/addCategory', [AdminPanelController::class, 'addCategory'])->name('adminPanel.addCategory');
        Route::delete('/deleteCategory/{category}', [AdminPanelController::class, 'deleteCategory'])->name('adminPanel.deleteCategory');

        Route::post('/category', [CategoryController::class, 'store'])->name('category.store');
        Route::put('/category/{category}', [CategoryController::class, 'update'])->name('category.update');
        Route::delete('/category/{category}', [CategoryController::class, 'delete'])->name('category.delete');

        Route::post('/reportList', [ReportListController::class, 'store'])->name('reportList.store');

        Route::get('/check', [BanController::class, 'check'])->name('ban.check');

        Route::post('/api/assign-permissions', [PermissionController::class, 'assignPermissions'])->name('permission.assignPermissions');

        Route::post('/api/assign-roles', [RoleController::class, 'assignRoles'])->name('role.assignRoles');
    });
});



Route::get('/react', function () {
    return view('react');
});

require __DIR__.'/auth.php';
