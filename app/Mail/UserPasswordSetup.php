<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\URL;

class UserPasswordSetup extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $initiatedBy;
    public $url;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user, User $initiatedBy)
    {
        $this->user = $user;
        $this->initiatedBy = $initiatedBy;

        $this->url = URL::signedRoute('setup-password', ['token' => $user->activation_token]);
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('email.user-password-setup');
    }
}
