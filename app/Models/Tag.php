<?php

namespace App\Models;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tag extends Model
{
    use HasFactory;
    
    protected $fillable=[
        'text',
    ];

    public function Posts()
    {
        return $this->belongsToMany(Post::class);
    }

   
}