<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Cookie;
use \Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    /**
     * Logg the user and create tokens
     *
     * @param LoginRequest $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     * @throws ValidationException
     */
    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)){
            throw ValidationException::withMessages(['email' => 'Invalid credentials']);
        }

        $user->tokens()->delete();

        $auth_tooken   = $user->createAuthToken('auth')->plainTextToken;
        $refresh_token = $user->createRefreshToken('refresh')->plainTextToken;

        $cookie = Cookie::create('refresh_token')
            ->withValue($refresh_token)
            ->withExpires(strtotime("+20 minutes"))
            ->withSecure(false)
            ->withHttpOnly(true);

        return response([
            'auth_token' => $auth_tooken,
            'user' => $user,
        ])->withCookie($cookie);
    }

    /**
     * Use refresh token cookie to reauth user
     *
     * @param Request $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function refresh(Request $request)
    {
        $refresh_token = $request->cookie('refresh_token');

        if(!$refresh_token ) {
            return response(['error' => 'Invalid refresh token'], 401);
        }

        $personal_access_token = PersonalAccessToken::findToken($refresh_token);

        if(!$personal_access_token ) {
            return response(['error' => 'Invalid refresh token'], 403);
        }

        $user = $personal_access_token->tokenable;

        if(!$user) {
            return response(['error' => 'Invalid refresh token'], 403);
        }

        $user->tokens()->delete();

        $auth_tooken   = $user->createAuthToken('auth')->plainTextToken;
        $refresh_token = $user->createRefreshToken('refresh')->plainTextToken;

        $cookie = Cookie::create('refresh_token')
            ->withValue($refresh_token)
            ->withExpires(strtotime("+20 minutes"))
            ->withSecure(false)
            ->withHttpOnly(true);

        return response([
            'auth_token' => $auth_tooken,
            'user' => $user,
        ])->withCookie($cookie);
    }
}
