<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User\BasicInformation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BasicInformationsController extends Controller
{
    public function getBasicInformation()
    {
        $userHasRole = auth()->user()->roles;
        $isDeveloper = auth()->user()->hasRole('Developer') || auth()->user()->hasRole('DeveloperPro');

        if ($userHasRole->toArray() != []) {
            if ($isDeveloper) {
                $basicInformation = BasicInformation::where('user_id', auth()->user()->id)->first();
                return Inertia::render('settings/BasicInformation', [
                    'basicInformation' => $basicInformation
                ]);
            }
        } else {
            return Inertia::render('auth/SelectRole');
        }
    }

    public function updateBasicInformation(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string'],
            'avatar' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'cover' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'bio' => ['nullable', 'string', 'max:250'],
            'website' => ['nullable', 'string', 'url'],
            'github' => ['nullable', 'string'],
            'twitter' => ['nullable', 'string'],
            'linkedin' => ['nullable', 'string']
        ]);

        $developerInfo = [
            'name' => $request->name,
            'bio' => $request->bio,
            'website' => $request->website,
            'github' => $request->github,
            'twitter' => $request->twitter,
            'linkedin' => $request->linkedin
        ];

        if ($request->file('avatar')) {
            $ext = $request->file('avatar')->getClientOriginalExtension();
            $filename = auth()->user()->id . '.' . $ext;
            Storage::disk('avatar')->put($filename, file_get_contents($request->file('avatar')));

            $developerInfo['avatar'] = $filename;
        }

        if ($request->file('cover')) {
            $ext = $request->file('cover')->getClientOriginalExtension();
            $filename = auth()->user()->id . '.' . $ext;
            Storage::disk('cover')->put($filename, file_get_contents($request->file('cover')));

            $developerInfo['cover'] = $filename;
        }

        BasicInformation::updateOrCreate([
            'user_id' => auth()->user()->id
        ], $developerInfo);

        return redirect()->back()->with('success', 'Basic information updated.');
    }
}
