<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\BanList;
use App\Models\Comment;
use App\Models\Category;
use App\Models\Tag;
use App\Models\Post;
use App\Models\ReportList;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;

class AdminPanelController extends Controller
{
    private function addLikesAndFavs($posts)
    {
        $favoritePosts = auth()->user()->favourites;

        $posts->each(function ($post) use ($favoritePosts) {
            $post->is_favorite = $favoritePosts->contains('post_id', $post->id);
            $post->is_liked = $post->likes()->where('user_id', auth()->id())->exists();
        });

        return $posts;
    }

    public function index(Request $request)
    {
        $perPage = 5;
        $page = $request->input('page', 1);

        $posts = Post::with(['user:id,name', 'category:id,name', 'tags', 'reports'])
            ->withCount('reports') // Oblicza liczbę raportów
            ->having('reports_count', '>', 0) // Warunek na ilość raportów większą od 0
            ->orderBy('reports_count', 'desc') // Sortuje według liczby raportów
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get();

        return PostResource::collection($this->addLikesAndFavs($posts));
    }

    public function hiddenPosts(Request $request)
    {
        $perPage = 5;
        $page = $request->input('page', 1);

        $posts = Post::with(['user:id,name', 'category:id,name', 'tags'])
            ->where('status', 'hide')
            ->orderBy('created_at', 'desc')
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get();

        return PostResource::collection($this->addLikesAndFavs($posts));
    }

    public function postReports(Request $request)
    {
        $reports = ReportList::with(['report'])//DB::table('report_lists')
            ->select('report_id', DB::raw('COUNT(report_id) as count'))
            ->where('post_id', $request->input('post_id'))
            ->groupBy('report_id')
            ->get();

        if ($reports) {
            return response()->json(['data' => $reports], 201);
        } else {
            return response()->json(['msg' => 'error while saving comment, refresh or try later'], 500);
        }
    }

    public function sendToMainPage(Post $post)
    {
        Post::where('id', ($post->id))->update([
            'status' => 'main page',
        ]);
        $p = Post::find($post->id);
        //$post->update(['status' => 'main page']);
        session()->flash('toast', 'Success');

        return response()->json(['msg' => 'success'], 201);
    }

    public function hidePost(Post $post)
    {
        Post::where('id', ($post->id))->update([
            'status' => 'hide',
        ]);

        return response()->json(['msg' => 'success'], 201);
    }

    public function deletePost(Post $post)
    {
        $post->delete();

        session()->flash('toast', 'Success deleting');

        return response()->json(['msg' => 'success'], 201);
    }

    public function deleteComment(Comment $comment)
    {
        $comment->delete();

        session()->flash('toast', 'Success');

        return response()->json(['msg' => 'success'], 201);
    }

    public function banUser(Request $request)
    {
        if (! BanList::where('user_id', $request->input('user_id'))->first()) {

            $user = User::find($request->input('user_id')); // Znajdź użytkownika, któremu chcesz przypisać rolę

            $user->syncRoles(['observer']); // Przypisz nową rolę

            $ban = new BanList();
            $ban->user_id = $request->input('user_id');
            $ban->ban_id = $request->input('ban_id');
            $ban->report_id = $request->input('report_id');
            $ban->save();

            $tmp = $user->update(['ban_list_id' => $ban->id]);

            if ($ban->save()) {
                return response()->json(['msg' => $tmp], 201);
            } else {
                return response()->json(['msg' => 'Error'], 500);
            }
        }

        return response()->json(['msg' => 'This user is already banned'], 201);
    }

    public function getAllUsers()
    {
        $users = User::with(['permissions', 'roles'])->get();

        return response()->json(['data' => $users], 201);
    }

    public function search(Request $request)
    {
        //dd($request);
        $query = $request->input('dane');

        //dd($query);
        if ($query) {
            $results = User::with('permissions', 'roles')
                ->where('name', 'LIKE', "%$query%")->get();
        } else {
            $results = [];
        }

        return response()->json(['data' => $results], 201);
    }

    public function searchById(Request $request)
    {
        $user = User::with('permissions', 'roles')->find($request->input('id'));

        return response()->json(['data' => $user], 201);
    }

    public function getAdmins()
    {
        $users = User::whereHas('roles', function ($query) {
            $query->where('name', 'admin');
        })->with('roles', 'permissions')->get();

        return response()->json(['data' => $users], 200);

    }

    public function getModerators()
    {
        $users = User::whereHas('roles', function ($query) {
            $query->where('name', 'moderator');
        })->with('roles', 'permissions')->get();

        return response()->json(['data' => $users], 200);

    }

    public function getBannedUsers()
    {
        $users = User::with('permissions', 'roles', 'ban.ban')
            ->where('ban_list_id', '!=', null)->get();

        return response()->json(['data' => $users], 200);

    }

    public function improveTag(Tag $tag)
    {
        $category = new Category();
        $category->name = $tag->name;
        $category->save();

        $tag->delete();

        return response()->json(['data' => "Success"], 200);
    }

    public function addCategory(Request $request)
    {
        $category = new Category();
        $category->name = $request->input('name');
        $category->save();

        return response()->json(['data' => "Success"], 200);
    }

    public function deleteCategory(Category $category)
    {
        $category->delete();


        return response()->json(['msg' => "Success"], 200);
    }
}

