<?php

namespace App\Http\Controllers;

use App\Models\Developer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DevelopersController extends Controller
{
    public function updateBasicInformation(Request $request)
    {
        $request->validate([
            'first_name' => ['required', 'string'],
            'last_name' => ['required', 'string'],
            'avatar' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'cover' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'bio' => ['nullable', 'string', 'max:250'],
            'website' => ['nullable', 'string', 'url'],
            'github' => ['nullable', 'string'],
            'twitter' => ['nullable', 'string'],
            'linkedin' => ['nullable', 'string']
        ]);

        $developerInfo = [
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
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

        Developer::updateOrCreate([
            'user_id' => auth()->user()->id
        ], $developerInfo);

        return redirect()->back()->with('success', 'Basic information updated.');
    }
}
