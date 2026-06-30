<?php

namespace App\Http\Controllers;

use App\Models\Chore;
use App\Models\Reward;
use Illuminate\Http\Request;
use Illuminate\View\View;

class DashboardController extends Controller
{
    public function index(): View
    {
        $user = auth()->user();

        return view('dashboard', [
            'user' => $user,
            'chores' => Chore::with('completions')->get(),
            'rewards' => Reward::all(),
        ]);
    }
}
