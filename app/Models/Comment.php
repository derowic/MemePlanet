<?php

namespace App\Models;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use Illuminate\Database\Eloquent\SoftDeletes;


class Comment extends Model
{
    use HasFactory;
    use \Conner\Likeable\Likeable;
    
    protected $fillable=[
        
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
        return $this->belongsTo(Post::class,'idPost');
    }

    public function replyTo()
    {
        return $this->belongsTo(Comment::class, 'idParentComment');
    }
}