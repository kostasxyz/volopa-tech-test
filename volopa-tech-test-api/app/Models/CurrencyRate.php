<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CurrencyRate extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'base',
        'target',
        'group',
        'rate',
    ];

    /**
     * Get the user of the wallet.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
