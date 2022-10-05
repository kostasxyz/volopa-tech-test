<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ApiController;
use App\Models\CurrencyRate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'v1',
], function() {
    /**
     * Random rates, refresh token cookie
     *
     */
    Route::middleware(['api.auth'])
        ->get('user/{id}/wallets', [ApiController::class, 'wallets_index'])
        ->name('user.wallets')
        ->where('id', '[0-9]+');

    /**
     * Random rates, refresh token cookie
     *
     */
    Route::middleware(['api.auth'])
        ->get('currencies/rates', function() {
        $rates = CurrencyRate::all();
        return response($rates);
    })
    ->name('currencies.rates');

    /**
     * Auth routes
     *
     */
    Route::post('login', [ AuthController::class, 'login' ])->name('login');
    Route::post('refresh', [ AuthController::class, 'refresh' ])->name('token.refresh');

    Route::middleware(['api.auth'])->get('/user', function (Request $request) {
        return $request->user();
    });
});
