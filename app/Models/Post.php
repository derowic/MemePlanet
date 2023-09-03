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

        'idUser',
        'title',
        'likes',
        'pathToImage',
        'description',

    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'idUser');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'idPost');
    }

    public function favourite()
    {
        return $this->belongsToMany(Favourite::class, 'idUser');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'idCategory');
    }

    public function tags()
    {
        return $this->belongsTo(TagTable::class, 'idUser');
    }

}
