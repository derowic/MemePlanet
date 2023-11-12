<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'sender' => $this->sender,
            'receiver_id' => $this->receiver_id,
            'type' => $this->type,
            'element_id' => $this->element_id,
            'seen' => $this->seen,
        ];
    }
}
