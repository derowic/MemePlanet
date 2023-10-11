<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'text' => $this->text,
            'likes' => $this->likes,
            'parent_comment' => $this->comment,
            'user' => $this->user,
        ];
    }
}
