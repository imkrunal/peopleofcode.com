<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkPreference extends Model
{
    use HasFactory;

    protected $fillable = [
        'weekly_availability',
        'no_availability_reason',
        'available_from',
        'search_status',
        'work_type',
        'client_type',
        'commitment_length',
        'prefered_timezone',
        'user_id'
    ];
}
