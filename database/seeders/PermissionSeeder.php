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

        Permission::create(['name' => 'post.sendToMainPage']);
        Permission::create(['name' => 'post.hide']);
        Permission::create(['name' => 'post.showReport']);
        Permission::create(['name' => 'post.delete']);
        Permission::create(['name' => 'post.create']);
        Permission::create(['name' => 'post.like']);
        Permission::create(['name' => 'post.fav']);
        Permission::create(['name' => 'post.report']);

        Permission::create(['name' => 'user.ban']);

        Permission::create(['name' => 'comment.create']);
        Permission::create(['name' => 'comment.delete']);

        $adminRole = Role::findByName('admin');
        $adminRole->givePermissionTo('post.sendToMainPage');
        $adminRole->givePermissionTo('post.hide');
        $adminRole->givePermissionTo('post.showReport');
        $adminRole->givePermissionTo('post.delete');
        $adminRole->givePermissionTo('post.create');
        $adminRole->givePermissionTo('post.like');
        $adminRole->givePermissionTo('post.fav');
        $adminRole->givePermissionTo('user.ban');
        $adminRole->givePermissionTo('comment.create');
        $adminRole->givePermissionTo('comment.delete');
        $adminRole->givePermissionTo('post.report');

        $moderatorRole = Role::findByName('moderator');
        $moderatorRole->givePermissionTo('post.sendToMainPage');
        $moderatorRole->givePermissionTo('post.hide');
        $moderatorRole->givePermissionTo('post.showReport');
        $moderatorRole->givePermissionTo('post.create');
        $moderatorRole->givePermissionTo('post.like');
        $moderatorRole->givePermissionTo('post.fav');
        $moderatorRole->givePermissionTo('comment.create');
        $moderatorRole->givePermissionTo('post.report');

        $userRole = Role::findByName('user');
        $userRole->givePermissionTo('comment.create');
        $userRole->givePermissionTo('post.create');
        $userRole->givePermissionTo('post.like');
        $userRole->givePermissionTo('post.fav');
        $userRole->givePermissionTo('post.report');
    }
}
