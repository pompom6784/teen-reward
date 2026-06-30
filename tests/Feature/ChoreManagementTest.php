<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Chore;

class ChoreManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_parent_can_create_edit_and_delete_chore(): void
    {
        $parent = User::factory()->create(['role' => 'parent']);
        $teen = User::factory()->create(['role' => 'teen']);

        $this->actingAs($parent)
            ->post(route('chores.store'), [
                'title' => 'Test chore',
                'description' => 'Do stuff',
                'points_value' => 10,
                'recurrence_type' => 'weekly',
            ])
            ->assertRedirect(route('chores.index'));

        $this->assertDatabaseHas('chores', ['title' => 'Test chore', 'created_by' => $parent->id]);

        $chore = Chore::first();

        $this->actingAs($parent)
            ->put(route('chores.update', $chore), [
                'title' => 'Updated chore',
                'description' => 'Updated',
                'points_value' => 15,
                'recurrence_type' => 'weekly',
            ])
            ->assertRedirect(route('chores.index'));

        $this->assertDatabaseHas('chores', ['title' => 'Updated chore', 'points_value' => 15]);

        $this->actingAs($parent)
            ->delete(route('chores.destroy', $chore))
            ->assertRedirect(route('chores.index'));

        $this->assertDatabaseMissing('chores', ['id' => $chore->id]);
    }

    public function test_teen_cannot_access_chore_management(): void
    {
        $teen = User::factory()->create(['role' => 'teen']);

        $this->actingAs($teen)
            ->get(route('chores.index'))
            ->assertStatus(403);

        $this->actingAs($teen)
            ->post(route('chores.store'), [])
            ->assertStatus(403);
    }
}
