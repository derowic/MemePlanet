<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();
        

        $admin = Role::create(['name' => 'admin']); // Utworzenie roli "admin"
        $user = Role::create(['name' => 'user']); // Utworzenie roli "admin"
        
        //$admin = Role::create(['name' => config('auth.roles.admin')]);
        //$user = Role::create(['name' => config('auth.roles.user')]);
        //$moderator = Role::create(['name' => config('auth.roles.moderator')]);
    }
}
