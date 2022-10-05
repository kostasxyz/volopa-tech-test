<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;
use \Laravel\Sanctum\PersonalAccessToken;

class ApiAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        $auth_token = $request->bearerToken();

        if(!$auth_token ) {
            return response(['error' => 'Invalid refresh token'], 403);
        }

        $personal_access_token = PersonalAccessToken::findToken($auth_token);

        if(!$personal_access_token || $this->tokenExpired($personal_access_token) ) {
            return response(['error' => 'Invalid refresh token'], 403);
        }

        $user = $personal_access_token->tokenable;

        if(!$user) {
            return response(['error' => 'Invalid refresh token'], 403);
        }

        return $response;
    }

    /**
     * Check if an access token is expired
     *
     * @param $accessToken
     * @return bool
     */
    public function tokenExpired($accessToken)
    {
        if (Carbon::parse($accessToken->expires_at) < Carbon::now()) {
            return true;
        }
        return false;
    }
}
