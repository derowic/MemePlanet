<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'element',
        'response_to',
        'name',
        'seen',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user');
    }
}
