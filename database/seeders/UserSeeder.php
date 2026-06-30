<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Parent',
            'email' => 'parent@example.com',
            'role' => 'parent',
            'points_balance' => 0,
        ]);

        User::factory()->create([
            'name' => 'Teen',
            'email' => 'teen@example.com',
            'role' => 'teen',
            'points_balance' => 0,
        ]);
    }
}
