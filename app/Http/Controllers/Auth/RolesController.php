<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RolesController extends Controller
{
    public function updateRole(Request $request)
    {
        $request->validate([
            'role' => 'required|string'
        ]);

        auth()->user()->assignRole($request->role);

        return redirect()->back()->with('success', 'Role updated.');
    }
}
