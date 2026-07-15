<?php

use App\Http\Controllers\Api\AppBootstrapController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ChoreController;
use App\Http\Controllers\Api\ClaimController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\RewardController;
use Illuminate\Support\Facades\Route;

Route::get('/bootstrap', AppBootstrapController::class)->name('api.bootstrap');

Route::middleware('guest')->group(function () {
    Route::post('/login', [AuthController::class, 'login'])->name('api.login');
    Route::post('/register', [AuthController::class, 'register'])->name('api.register');
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('api.logout');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('api.profile.update');
    Route::put('/profile/password', [ProfileController::class, 'updatePassword'])->name('api.profile.password');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('api.profile.destroy');

    Route::post('/chores', [ChoreController::class, 'store'])->name('api.chores.store');
    Route::put('/chores/{chore}', [ChoreController::class, 'update'])->name('api.chores.update');
    Route::delete('/chores/{chore}', [ChoreController::class, 'destroy'])->name('api.chores.destroy');
    Route::post('/chores/{chore}/claim', [ClaimController::class, 'store'])->name('api.chores.claim');

    Route::post('/claims/{claim}/approve', [ClaimController::class, 'approve'])->name('api.claims.approve');
    Route::post('/claims/{claim}/reject', [ClaimController::class, 'reject'])->name('api.claims.reject');

    Route::post('/rewards/{reward}/redeem', [RewardController::class, 'redeem'])->name('api.rewards.redeem');
});
