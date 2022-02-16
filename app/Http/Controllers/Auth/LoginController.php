<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoginController extends Controller
{

    use AuthenticatesUsers;

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function showLoginForm()
    {
        return Inertia::render('auth/Login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'username' => ['required', 'string', 'exists:users'],
            'password' => ['required', 'string'],
            'remember' => ['boolean']
        ]);

        if (!auth()->attempt([
            'username' => $request->username, 'password' => $request->password
        ], $request->remember)) {
            return redirect()->back()->withErrors(['password' => 'Invalid password']);
        }

        if (auth()->user()->email_verified_at == null) {
            return redirect()->back()->withErrors(['username' => 'Email is not verified.']);
        }

        return redirect()->route('home')->with('success', 'Login Success');
    }
}
