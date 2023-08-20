<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        //Permission::create(['name' => 'posts.destroy']);
        
        $adminRole = Role::findByName('admin');
        //$adminRole->givePermissionTo('posts.destroy');
        
        $userRole = Role::findByName('user');

        //$moderatorRole = Role::findByName(config('auth.roles.moderator'));
        //$moderatorRole->givePermissionTo('posts.destroy');

    }
}
