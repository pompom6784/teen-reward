<?php

namespace Database\Seeders;

use App\Models\Reward;
use Illuminate\Database\Seeder;

class RewardSeeder extends Seeder
{
    public function run(): void
    {
        Reward::create([
            'name' => '1 hour internet',
            'points_cost' => 15,
            'duration_minutes' => 60,
        ]);
    }
}
