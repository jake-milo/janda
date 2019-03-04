<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * Shows the login page.
     */
    public function showLoginForm()
    {
        return view('login');
    }

    /**
     * Handles login requests.
     *
     * @param LoginRequest $request
     */
    public function login(LoginRequest $request)
    {
        // Get the email and password as an assoc
        // array from the request.
        $credentials = $request->only('email', 'password');

        // Attempt to login with the credentials
        if (Auth::guard()->attempt($credentials)) {
            // Login was successful, redirect to the app
            return redirect('/');
        }

        // Login failed, so flash the email to the session
        // so that it is remembered in the form
        $request->flashOnly(['email']);

        // And return back to where we came from with the
        // error message attached.
        return back()->withErrors([
            'Incorrect email or password.',
        ]);
    }

    /**
     * Logs the user out and redirects to the login screen.
     */
    public function logout()
    {
        Auth::logout();

        return redirect()->route('login');
    }
}
