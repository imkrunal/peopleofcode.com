<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Developer extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'avatar',
        'cover',
        'bio',
        'website',
        'github',
        'twitter',
        'linkedin',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
