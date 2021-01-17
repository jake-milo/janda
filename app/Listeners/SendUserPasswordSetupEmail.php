<?php

namespace App\Listeners;

use App\Events\UserCreated;
use App\Mail\UserPasswordSetup;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class SendUserPasswordSetupEmail
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(UserCreated $event)
    {
        Mail::to($event->user->email)->send(new UserPasswordSetup($event->user, $event->initiatedBy));
    }
}
