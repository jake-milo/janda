<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Http\Requests\SetPasswordRequest;
use App\Models\User;
use Illuminate\Http\Request;

class AccountSetupController extends Controller
{
    public function view(Request $request, string $token)
    {
        return view('setup-password', [
            'token' => $token,
            'signature' => $request->signature,
        ]);
    }

    public function setup(SetPasswordRequest $request, string $token)
    {
        $user = User::where('activation_token', $token)->firstOrFail();

        $user->password = $request->getPassword();
        $user->activation_token = null;
        $user->save();

        return redirect('login')->with('success', 'Your password has been setup, you can now log in.');
    }
}
