<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the wallets for the user.
     */
    public function wallets()
    {
        return $this->hasMany(Wallet::class);
    }

    public function createAuthToken(string $name,  DateTimeInterface $expiresAt = null, array $abilities = [])
    {
        return $this->createToken(
            $name,
            array_merge($abilities, ['auth']),
            $expiresAt ?? now()->addMinutes(env('AUTH_TOKEN_EXP', 10))
        );
    }

    public function createRefreshToken(string $name, DateTimeInterface $expiresAt = null)
    {
        return $this->createToken(
            $name, ['refresh'],
            $expiresAt ?? now()->addMinutes(env('REFRESH_TOKEN_EXP', 1440))
        );
    }

    public function tokenExpired()
    {
        if (Carbon::parse($this->attributes['expires_at']) < Carbon::now()) {
            return true;
        }
        return false;
    }
}
