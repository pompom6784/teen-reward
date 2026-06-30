<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChoreCompletion extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function chore()
    {
        return $this->belongsTo(Chore::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
