<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to your application's "home" route.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     */
    public function boot(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });

        $this->routes(function () {
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));

            // Role = User
            Route::middleware(['api', 'auth:sanctum', 'role:user'])
                ->prefix('api/user')
                ->group(base_path('routes/roles/user.php'));

            // Role = Manager
            Route::middleware(['api', 'auth:sanctum', 'role:manager'])
                ->prefix('api/manager')
                ->group(base_path('routes/roles/manager.php'));

            // Role = Admin
            Route::middleware(['api', 'auth:sanctum', 'role:admin'])
                ->prefix('api/admin')
                ->group(base_path('routes/roles/admin.php'));

            // Role = Boss
            Route::middleware(['api', 'auth:sanctum', 'role:boss'])
                ->prefix('api/boss')
                ->group(base_path('routes/roles/boss.php'));   

            // Role = System
            Route::middleware(['api', 'auth:sanctum', 'role:system'])
                ->prefix('api/system')
                ->group(base_path('routes/roles/system.php'));    

            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });
    }
}
