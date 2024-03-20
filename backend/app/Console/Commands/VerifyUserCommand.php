<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class VerifyUserCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:verify';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'To Verify all Users';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        $users = \App\Models\User::query()
                        ->whereNull('email_verified_at')
                        ->get()
                        ->each( function($user) {
                            $user->email_verified_at = $user->created_at;
                            $user->save();
                        });
    }
}
