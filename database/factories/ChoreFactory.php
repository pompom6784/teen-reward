<?php

namespace Database\Factories;

use App\Models\Chore;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Chore>
 */
class ChoreFactory extends Factory
{
    protected $model = Chore::class;

    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'description' => fake()->optional()->sentence(),
            'points_value' => 10,
            'emoji' => '🧹',
            'recurrence_type' => 'weekly',
            'recurrence_interval' => null,
            'created_by' => User::factory()->state(['role' => 'parent']),
        ];
    }
}
