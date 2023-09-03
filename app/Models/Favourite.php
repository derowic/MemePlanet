<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favourite extends Model
{
    use HasFactory;

    protected $fillable = [

        'post',
        'user',

    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user');
    }

    public function post()
    {
        return $this->belongsTo(Post::class, 'post');
    }

    /*
    public function user()
    {
        return $this->belongsTo(User::class, 'idUser');
    }

    public function post()
    {
        return $this->belongsTo(Post::class,'idPost');
    }
    */
}
