<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        Permission::create(['name' => 'posts.sendToMainPage']);
        Permission::create(['name' => 'posts.hide']);
        Permission::create(['name' => 'posts.showReport']);
        Permission::create(['name' => 'posts.delete']);
        Permission::create(['name' => 'user.ban']);

        $adminRole = Role::findByName('admin');
        $adminRole->givePermissionTo('posts.sendToMainPage');
        $adminRole->givePermissionTo('posts.hide');
        $adminRole->givePermissionTo('posts.showReport');
        $adminRole->givePermissionTo('posts.delete');
        $adminRole->givePermissionTo('user.ban');

        $moderatorRole = Role::findByName('moderator');
        $moderatorRole->givePermissionTo('posts.sendToMainPage');
        $moderatorRole->givePermissionTo('posts.hide');
        $moderatorRole->givePermissionTo('posts.showReport');

    }
}
