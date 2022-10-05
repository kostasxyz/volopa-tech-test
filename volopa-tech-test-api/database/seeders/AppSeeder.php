<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AppSeeder extends Seeder
{
    /**
     * Random rates
     *
     * @return array
     */
    private function fakeRates()
    {
        return [
            [
                'base' => 'GBP',
                'target' => 'GBP',
                'rate' => 1,
                'group' => 'common',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'base' => 'GBP',
                'target' => 'USD',
                'rate' => 0.89077,
                'group' => 'common',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'base' => 'GBP',
                'target' => 'EUR',
                'rate' => 0.87338,
                'group' => 'common',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'base' => 'GBP',
                'target' => 'CAD',
                'rate' => 0.64992,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'base' => 'GBP',
                'target' => 'AUD',
                'rate' => 0.57642,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'base' => 'GBP',
                'target' => 'JPY',
                'rate' => 0.00615,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'base' => 'GBP',
                'target' => 'INR',
                'rate' => 0.01091,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];
    }

    /**
     * Random walets
     *
     * @return void
     */
    private function fakeWallets()
    {
        return [
            [
                'currency' => 'GBP',
                'amount' => 12789,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'currency' => 'USD',
                'amount' => 34567,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'currency' => 'EUR',
                'amount' => 1098,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'currency' => 'CAD',
                'amount' => 10099,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'currency' => 'AUD',
                'amount' => 10099,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'currency' => 'JPY',
                'amount' => 10099,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'currency' => 'INR',
                'amount' => 10099,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];
    }
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'John Doe',
            'email' => 'user@test.com',
            'password' => Hash::make('password'),
        ]);

        foreach($this->fakeRates() as $rate) {
            DB::table('currency_rates')->insert($rate);
        }

        foreach($this->fakeWallets() as $wallet) {
            $wallet['user_id'] = 1;
            DB::table('wallets')->insert($wallet);
        }
    }
}
