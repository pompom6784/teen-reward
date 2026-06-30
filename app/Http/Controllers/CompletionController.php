<?php

namespace App\Http\Controllers;

use App\Models\ChoreCompletion;
use Illuminate\Http\RedirectResponse;

class CompletionController extends Controller
{
    public function approve(ChoreCompletion $completion): RedirectResponse
    {
        $completion->update(['status' => 'approved']);
        $completion->user->increment('points_balance', $completion->chore->points_value);

        return redirect()->back()->with('status', 'Chore approved and points added.');
    }
}
