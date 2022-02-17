<?php

use App\Http\Controllers\DevelopersController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfilesController;
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
    Route::get('/settings', [ProfilesController::class, 'index'])->name('settings');
    Route::post('/update-role', [ProfilesController::class, 'updateRole'])->name('update-role');

    Route::group(['prefix' => 'developers'], function () {
        Route::post('/update-basic-information', [DevelopersController::class, 'updateBasicInformation']);
    });
});
