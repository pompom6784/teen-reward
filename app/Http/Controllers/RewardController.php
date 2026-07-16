<?php

namespace App\Http\Controllers;

use App\Models\Reward;
use App\Models\RewardRedemption;
use Illuminate\Http\RedirectResponse;

class RewardController extends Controller
{
    public function redeem(Reward $reward): RedirectResponse
    {
        $user = auth()->user();

        if ($user->points_balance < $reward->points_cost) {
            return redirect()->back()->with('error', __('messages.reward.not_enough_points'));
        }

        $user->decrement('points_balance', $reward->points_cost);

        RewardRedemption::create([
            'user_id' => $user->id,
            'reward_id' => $reward->id,
            'status' => 'fulfilled',
            'voucher_code' => 'TEST-1H-1',
            'redeemed_at' => now(),
        ]);

        return redirect()->back()->with('status', __('messages.reward.redeemed_with_voucher', ['voucher' => 'TEST-1H-1']));
    }
}
