<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Support\Facades\URL;
//use Illuminate\Auth\Events\Registered;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // check ReactJS Router
        ResetPassword::createUrlUsing(function ($user, string $token) {
            $url = env('FRONTEND_URL');
            return $url . '/password/reset/' . $token;
        });

        VerifyEmail::createUrlUsing(function ($notifiable) {
            $appUrl = env('APP_URL');
            $token = sha1($notifiable->getEmailForVerification());
            return $appUrl . '/api/email/verify/' . $notifiable->getKey() . '/' . $token;
        });
    }
}

