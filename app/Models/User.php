<?php

namespace App\Models;

use App\Events\UserCreated;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'activation_token',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'activation_token',
    ];

    protected $dispatchesEvents = [
        'created' => UserCreated::class,
    ];

    public function getIsSetupAttribute()
    {
        return $this->password && !$this->activation_token;
    }
}
