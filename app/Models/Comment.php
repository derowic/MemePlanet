<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use \Conner\Likeable\Likeable;
    use HasFactory;

    protected $fillable = [

        'idPost',
        'idUser',
        'likes',
        'text',
        'idParentComment',

    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'idUser');
    }

    public function post()
    {
        return $this->belongsTo(Post::class, 'idPost');
    }

    public function replyTo()
    {
        return $this->belongsTo(Comment::class, 'idParentComment');
    }
}
