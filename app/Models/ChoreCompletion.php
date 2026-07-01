<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property Chore $chore
 * @property User $user
 */
class ChoreCompletion extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function chore(): BelongsTo
    {
        return $this->belongsTo(Chore::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
