<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // Teen: view available chores and claim
    Route::get('chores/available', [App\Http\Controllers\ChoreController::class, 'available'])->name('chores.available');
    Route::get('chores/assigned', [App\Http\Controllers\ChoreController::class, 'available'])->name('chores.assigned');
    Route::post('chores/{chore}/claim', [App\Http\Controllers\ClaimController::class, 'store'])->name('chores.claim');
    Route::post('chores/{chore}/complete', [App\Http\Controllers\ClaimController::class, 'store'])->name('chores.complete');

    // Teen: list own claims
    Route::get('claims', [App\Http\Controllers\ClaimController::class, 'index'])->name('claims.index');

    // Parent: manage pending claims
    Route::get('claims/pending', [App\Http\Controllers\ClaimController::class, 'pending'])->name('claims.pending');
    Route::post('claims/{claim}/approve', [App\Http\Controllers\ClaimController::class, 'approve'])->name('claims.approve');
    Route::post('claims/{claim}/reject', [App\Http\Controllers\ClaimController::class, 'reject'])->name('claims.reject');

    // Parent-only chores management
    Route::resource('chores', App\Http\Controllers\ChoreController::class)->except(['show'])->names('chores');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
