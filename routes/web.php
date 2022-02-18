<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\User\BasicInformationsController;
use App\Http\Controllers\User\WorkPreferencesController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::group(['middleware' => 'auth'], function () {
    Route::post('/update-role', [RolesController::class, 'updateRole'])->name('update-role');

    Route::group(['prefix' => 'settings'], function () {
        Route::get('/', [BasicInformationsController::class, 'getBasicInformation'])->name('settings');
        Route::post('/update-basic-information', [BasicInformationsController::class, 'updateBasicInformation']);
        Route::get('/work-preferences', [WorkPreferencesController::class, 'getWorkPreferences'])->name('settings');
        Route::post('/update-work-preferences', [WorkPreferencesController::class, 'updateWorkPreferences']);
    });
});
