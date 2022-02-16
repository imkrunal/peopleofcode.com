<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $adminInfo = [
            'username' => 'spedix',
            'email' => 'admin@peopleofcode.com',
            'password' => Hash::make('Password123#'),
            'email_verified_at' => now()
        ];

        $adminUser = User::firstOrCreate(['username' => $adminInfo['username']], $adminInfo);

        $adminUser->syncRoles(['Admin']);
    }
}
