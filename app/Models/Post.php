<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Post extends Model
{
    use \Conner\Likeable\Likeable;
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'category_id',
        'tag_list_id',
        'title',
        'text',
        'likes',
        'path_to_image',
        'description',
    ];

    protected $appends = ['is_favorite', 'is_liked'];

    public function isPostLiked()
    {
        $this->attributes['is_liked'] = $this->liked();
    }

    public function isPostFavorite()
    {
        $favorite = Favourite::where('user_id', auth()->user()->id)
            ->where('post_id', $this->id)
            ->first();

        $this->attributes['is_favorite'] = $favorite !== null;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function favourite()
    {
        return $this->belongsToMany(Favourite::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function tags()
    {
        return $this->belongsTo(TagList::class);
    }
}
