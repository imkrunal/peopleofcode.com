<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BasicInformation extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'title',
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
