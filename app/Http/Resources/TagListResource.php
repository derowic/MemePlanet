<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TagListResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'post_id' => $this->post_id,
            'tag_id' => $this->tag_id,
        ];
    }
}
