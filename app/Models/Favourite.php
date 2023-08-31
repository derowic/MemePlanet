<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favourite extends Model
{
    use HasFactory;

    protected $fillable = [

        'idPost',
        'idUser',

    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'idUser');
    }

    public function post()
    {
        return $this->belongsTo(Post::class, 'idPost');
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
