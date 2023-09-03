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

        'user',
        'title',
        'likes',
        'path_to_image',
        'description',

    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'post');
    }

    public function favourite()
    {
        return $this->belongsToMany(Favourite::class, 'user');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category');
    }

    public function tags()
    {
        return $this->belongsTo(TagTable::class, 'user');
    }

}
