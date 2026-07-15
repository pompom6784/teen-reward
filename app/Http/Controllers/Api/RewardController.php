<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reward;
use App\Models\RewardRedemption;
use Illuminate\Http\JsonResponse;

class RewardController extends Controller
{
    public function redeem(Reward $reward): JsonResponse
    {
        $user = auth()->user();

        abort_unless($user?->role === 'teen', 403);

        if ($user->points_balance < $reward->points_cost) {
            return response()->json([
                'message' => 'You do not have enough points.',
            ], 422);
        }

        $user->decrement('points_balance', $reward->points_cost);

        $redemption = RewardRedemption::query()->create([
            'user_id' => $user->id,
            'reward_id' => $reward->id,
            'status' => 'fulfilled',
            'redeemed_at' => now(),
        ]);

        $voucherCode = sprintf('VOUCHER-%d-%d', $reward->id, $redemption->id);
        $redemption->update([
            'voucher_code' => $voucherCode,
        ]);

        return response()->json([
            'message' => "Reward redeemed. Voucher: {$voucherCode}",
            'voucherCode' => $voucherCode,
        ], 201);
    }
}
