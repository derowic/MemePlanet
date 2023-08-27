<?php
namespace App\Models;

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use HasFactory;
    use SoftDeletes;

    use \Conner\Likeable\Likeable;

    protected $fillable=[
        
        
        'idUser',
        'title',
        'likes',
        'pathToImage',
        'description',
        
        
        

    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'idUser');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class,'idPost');
    }
   

    
}
