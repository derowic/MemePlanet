<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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
        
       
        for ($i = 1; $i <= 10; $i++) {

            $user = User::create([
                'name' => 'User'.strval($i),
                'email' => 'user'.strval($i).'@localhost',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('12345678'),
                'ban_to' => null,
                'remember_token' => Str::random(10),
            ]);
            
        }

    }
}
