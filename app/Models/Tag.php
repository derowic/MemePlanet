<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function tagLists()
    {
        return $this->belongsToMany(TagList::class);
    }

    public function posts()
    {
        return $this->hasManyThrough(Post::class, TagList::class, 'tag_id', 'id', 'id', 'post_id');
    }
}
