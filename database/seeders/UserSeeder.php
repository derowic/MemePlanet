<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        //$adminRole->syncPermissions($adminPermissions);
        //$moderatorRole->syncPermissions($moderatorPermissions);
        //$userRole->syncPermissions($userPermissions);

        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@localhost',
            'email_verified_at' => Carbon::now(),
            'password' => Hash::make('12345678'),
            'remember_token' => Str::random(10),
        ]);

        $adminRole = Role::findByName('admin');

        if (isset($adminRole)) {
            $admin->assignRole($adminRole);

        }

        $moderator = User::create([
            'name' => 'Moderator',
            'email' => 'moderator@localhost',
            'email_verified_at' => Carbon::now(),
            'password' => Hash::make('12345678'),
            'remember_token' => Str::random(10),
        ]);

        $moderatorRole = Role::findByName('moderator');

        if (isset($moderatorRole)) {
            $moderator->assignRole($moderatorRole);

        }

        $userRole = Role::findByName('user');

        for ($i = 1; $i <= 10; $i++) {

            $user = User::create([
                'name' => 'User'.strval($i),
                'email' => 'user'.strval($i).'@localhost',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('12345678'),
                'remember_token' => Str::random(10),
            ]);
            $user->assignRole($userRole);
        }

        $user = User::create([
            'name' => 'Łęcina',
            'email' => 'user12@localhost',
            'email_verified_at' => Carbon::now(),
            'password' => Hash::make('12345678'),
            'remember_token' => Str::random(10),
        ]);

        $user->assignRole($userRole);

        $user = User::create([
            'name' => 'Majster98',
            'email' => 'user13@localhost',
            'email_verified_at' => Carbon::now(),
            'password' => Hash::make('12345678'),
            'remember_token' => Str::random(10),
        ]);

        $user->assignRole($userRole);

    }
}
