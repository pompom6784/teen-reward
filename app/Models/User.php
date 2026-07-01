<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string|null $email_verified_at
 * @property string $role
 * @property int $points_balance
 * @property string|null $password
 * @property string|null $remember_token
 * @method static \Illuminate\Database\Eloquent\Builder|User create(array $attributes = [])
 */
#[Fillable(['name', 'email', 'password', 'role', 'points_balance'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable implements MustVerifyEmail
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
