<?php

namespace App\Http\Controllers;

use App\Models\Developer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfilesController extends Controller
{
    public function index(Request $request)
    {
        $userHasRole = auth()->user()->roles;
        $isDeveloper = auth()->user()->hasRole('Developer') || auth()->user()->hasRole('DeveloperPro');

        if ($userHasRole->toArray() != []) {
            if ($isDeveloper) {
                $basicInformation = Developer::where('user_id', auth()->user()->id)->first();
                return Inertia::render('developers/Settings', [
                    'basicInformation' => $basicInformation
                ]);
            }
        } else {
            return Inertia::render('profile/SelectRole');
        }
    }

    public function updateRole(Request $request)
    {
        $request->validate([
            'role' => 'required|string'
        ]);

        auth()->user()->assignRole($request->role);

        return redirect()->back()->with('success', 'Role updated.');
    }
}
