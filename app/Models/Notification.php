<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Post;
use App\Models\User;
class Notification extends Model
{
    use HasFactory;
    

    protected $fillable=[
        
        'idElement',
        'idUser',
        'seen',

    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'idUser');
    }

   
}
