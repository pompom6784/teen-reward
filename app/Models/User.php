<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'email', 'password', 'role', 'points_balance'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'points_balance' => 'integer',
    ];

    public function chores(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Chore::class, 'assigned_to');
    }

    public function completions(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(ChoreCompletion::class);
    }

    public function redemptions(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(RewardRedemption::class);
    }
}
