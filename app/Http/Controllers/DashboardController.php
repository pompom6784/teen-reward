<?php

namespace App\Http\Controllers;

use App\Models\Chore;
use App\Models\Reward;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\View\View;

class DashboardController extends Controller
{
    public function index(): View
    {
        $user = Auth::user();

        return view('dashboard', [
            'user' => $user,
            'chores' => Chore::with('completions')->get(),
            'rewards' => Reward::all(),
        ]);
    }
}
