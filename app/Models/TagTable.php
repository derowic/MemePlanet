<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TagTable extends Model
{
    use HasFactory;

    protected $fillable = [

        'tag',
        'user',

    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user');
    }

    public function tag()
    {
        return $this->belongsTo(Tag::class, 'tag');
    }

}
