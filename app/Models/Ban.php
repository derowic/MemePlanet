<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ban extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'ban_length',
    ];

    public function posts()
    {
        return $this->belongsToMany(Post::class);
    }
}
