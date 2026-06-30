<?php

namespace App\Models;

use App\Models\ChoreClaim;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chore extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function completions()
    {
        return $this->hasMany(ChoreCompletion::class);
    }

    public function claims()
    {
        return $this->hasMany(ChoreClaim::class);
    }

    public function isRecurring(): bool
    {
        return $this->recurrence_type !== 'none';
    }
}
