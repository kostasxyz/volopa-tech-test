<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;

class ApiController extends Controller
{
    /**
     * Return users wallets
     *
     * @param integer $id
     * @return void
     */
    public function wallets_index(int $id)
    {
        $user = User::with('wallets')->where('id', $id)->first();

        return response($user->wallets);
    }
}
