<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use \Conner\Likeable\Likeable;
    use HasFactory;

    protected $fillable = [

        'post',
        'user',
        'likes',
        'text',
        'parent_comment',

    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user');
    }

    public function post()
    {
        return $this->belongsTo(Post::class, 'post');
    }

    public function reply_to()
    {
        return $this->belongsTo(Comment::class, 'parent_comment');
    }
}
