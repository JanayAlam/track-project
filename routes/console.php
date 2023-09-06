<?php

use Illuminate\Foundation\Inspiring;
use \App\Http\Services\V1\UserService;
use \App\Http\Services\V1\AdminService;
use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('create-admin {username} {email} {password}',
    function (string $username, string $email,  string $password) {
        if (strlen($username) < 2 || strlen($username) > 100) {
            return $this->comment('Username must be in between 2 to 100 characters');
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return $this->comment('Invalid email address format');
        }

        if (strlen($password) < 6) {
            return $this->comment('Password must be greater than or equal to 6 characters');
        }

        if (\App\Models\Admin::all()->count() >= 1) {
            return $this->comment('A super user has been already created');
        }

        try {
            $user = UserService::create([
                'username' => $username,
                'email' => $email,
                'password' => \Illuminate\Support\Facades\Hash::make($password),
            ]);
            if (!$user) throw new Exception('Could not create the user');
            AdminService::create([
                'user_id' => $user->id,
            ]);
        } catch (Exception $e) {
            UserService::destroyById($user->id);
            return $this->comment($e->getMessage());
        }

        return $this->comment('Successfully created the admin');
});
