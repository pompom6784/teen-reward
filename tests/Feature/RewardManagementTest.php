<?php

namespace Tests\Feature;

use App\Models\Reward;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RewardManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_parent_can_create_edit_and_delete_reward(): void
    {
        $parent = User::factory()->create(['role' => 'parent']);

        $this->actingAs($parent)
            ->postJson('/api/rewards', [
                'name' => 'Screen time 30 min',
                'points_cost' => 60,
                'duration_minutes' => 30,
                'emoji' => '📺',
            ])
            ->assertCreated();

        $this->assertDatabaseHas('rewards', ['name' => 'Screen time 30 min', 'points_cost' => 60, 'emoji' => '📺']);

        $reward = Reward::first();

        $this->actingAs($parent)
            ->putJson("/api/rewards/{$reward->id}", [
                'name' => 'Movie night',
                'points_cost' => 120,
                'duration_minutes' => 90,
                'emoji' => '🎬',
            ])
            ->assertOk();

        $this->assertDatabaseHas('rewards', ['name' => 'Movie night', 'points_cost' => 120, 'duration_minutes' => 90, 'emoji' => '🎬']);

        $this->actingAs($parent)
            ->deleteJson("/api/rewards/{$reward->id}")
            ->assertOk();

        $this->assertDatabaseMissing('rewards', ['id' => $reward->id]);
    }

    public function test_teen_cannot_access_reward_management(): void
    {
        $teen = User::factory()->create(['role' => 'teen']);
        $reward = Reward::factory()->create();

        $this->actingAs($teen)
            ->postJson('/api/rewards', [
                'name' => 'Nope',
                'points_cost' => 20,
                'duration_minutes' => 10,
            ])
            ->assertStatus(403);

        $this->actingAs($teen)
            ->putJson("/api/rewards/{$reward->id}", [
                'name' => 'Nope update',
                'points_cost' => 25,
                'duration_minutes' => 10,
            ])
            ->assertStatus(403);

        $this->actingAs($teen)
            ->deleteJson("/api/rewards/{$reward->id}")
            ->assertStatus(403);
    }
}
