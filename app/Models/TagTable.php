<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TagTable extends Model
{
    use HasFactory;

    protected $fillable = [

        'idTag',
        'idUser',

    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'idUser');
    }

    public function tag()
    {
        return $this->belongsTo(Tag::class, 'idTag');
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
