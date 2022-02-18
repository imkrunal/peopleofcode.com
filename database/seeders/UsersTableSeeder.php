<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\User\BasicInformation;
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

        $devInfo = [
            'username' => 'imkrunal',
            'email' => 'krunal@peopleofcode.com',
            'password' => Hash::make('Password123#'),
            'email_verified_at' => now()
        ];

        $devUser = User::firstOrCreate(['username' => $devInfo['username']], $devInfo);

        $devUser->syncRoles(['Developer']);

        $basicInfo = [
            'name' => 'Krunal Shah',
            'title' => 'Technical Lead',
            'bio' => 'I enjoy building great software and helping others do the same. I have a passion for technology, education, and software development and enjoy opportunities to combine the three.',
            'website' => 'https://krunal.me',
            'github' => 'imkrunal',
            'twitter' => 'krunal7091',
            'linkedin' => 'krunal7091'
        ];

        BasicInformation::firstOrCreate(['user_id' => $devUser['id']], $basicInfo);
    }
}
