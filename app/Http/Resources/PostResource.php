<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'text' => $this->text,
            'likes' => $this->likes,
            'path_to_image' => $this->path_to_image,
            'status' => $this->status,
            'description' => $this->description,
            'category' => $this->category,
            'tags' => $this->tags,
            'user' => $this->user,
            'is_liked' => $this->is_liked,
            'is_fav' => $this->is_favorite,
            'reports' => $this->reports ?? null,
            'comment_count' => $this->comment_count,
        ];
    }
}
