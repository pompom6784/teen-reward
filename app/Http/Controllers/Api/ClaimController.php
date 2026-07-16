<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Chore;
use App\Models\ChoreClaim;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ClaimController extends Controller
{
    public function store(Request $request, Chore $chore): JsonResponse
    {
        abort_unless($request->user()?->role === 'teen', 403);

        $periodStart = $this->calculatePeriodStart($chore, Carbon::now());

        $existing = ChoreClaim::query()
            ->where('chore_id', $chore->id)
            ->where('user_id', $request->user()->id)
            ->whereDate('period_start', $periodStart->toDateString())
            ->first();

        if ($existing) {
            return response()->json([
                'message' => __('messages.claim.already_claimed_current_period'),
            ], 422);
        }

        ChoreClaim::query()->create([
            'chore_id' => $chore->id,
            'user_id' => $request->user()->id,
            'period_start' => $periodStart->toDateString(),
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => __('messages.claim.submitted_for_approval'),
        ], 201);
    }

    public function approve(Request $request, ChoreClaim $claim): JsonResponse
    {
        abort_unless($request->user()?->role === 'parent', 403);

        if ($claim->status !== 'pending') {
            return response()->json([
                'message' => __('messages.claim.only_pending_can_be_approved'),
            ], 422);
        }

        $claim->loadMissing(['chore', 'user']);

        $points = $claim->chore->points_value;
        $claim->user->increment('points_balance', $points);
        $claim->update([
            'status' => 'approved',
            'points_awarded' => $points,
        ]);

        return response()->json([
            'message' => __('messages.claim.approved'),
        ]);
    }

    public function reject(Request $request, ChoreClaim $claim): JsonResponse
    {
        abort_unless($request->user()?->role === 'parent', 403);

        if ($claim->status !== 'pending') {
            return response()->json([
                'message' => __('messages.claim.only_pending_can_be_rejected'),
            ], 422);
        }

        $claim->update([
            'status' => 'rejected',
        ]);

        return response()->json([
            'message' => __('messages.claim.rejected'),
        ]);
    }

    private function calculatePeriodStart(Chore $chore, Carbon $now): Carbon
    {
        return match ($chore->recurrence_type) {
            'daily' => $now->copy()->startOfDay(),
            'weekly' => $now->copy()->startOfWeek(),
            'monthly' => $now->copy()->startOfMonth(),
            'custom' => $this->calculateCustomPeriodStart($chore, $now),
            default => $now->copy()->startOfDay(),
        };
    }

    private function calculateCustomPeriodStart(Chore $chore, Carbon $now): Carbon
    {
        $interval = (int) ($chore->recurrence_interval ?? 1);
        $unit = $chore->recurrence_unit ?: 'days';
        $anchor = Carbon::parse($chore->created_at)->startOfDay();
        $diff = (int) match ($unit) {
            'days' => $anchor->diffInDays($now),
            'weeks' => $anchor->diffInWeeks($now),
            'months' => $anchor->diffInMonths($now),
            default => $anchor->diffInDays($now),
        };
        $periodCount = intdiv($diff, max($interval, 1));

        return match ($unit) {
            'days' => $anchor->copy()->addDays($periodCount * $interval),
            'weeks' => $anchor->copy()->addWeeks($periodCount * $interval)->startOfWeek(),
            'months' => $anchor->copy()->addMonths($periodCount * $interval)->startOfMonth(),
            default => $anchor->copy()->addDays($periodCount * $interval),
        };
    }
}
