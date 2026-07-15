import { motion } from 'framer-motion';
import { useIntl } from 'react-intl';
import { apiRequest } from '../../spa/api';
import { cardVariants } from '../../spa/utils';

function ActionCenter({ busyKey, claims, rewards, runAction, user }) {
    const intl = useIntl();

    return (
        <motion.section
            initial="hidden"
            animate="visible"
            variants={cardVariants(0.2)}
            className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 backdrop-blur"
        >
            <h2 className="text-2xl font-bold text-white">
                {intl.formatMessage(
                    user.role === 'parent'
                        ? {
                            id: 'actionCenter.title.parent',
                            defaultMessage: 'Pending approvals',
                        }
                        : {
                            id: 'actionCenter.title.teen',
                            defaultMessage: 'Rewards catalogue',
                        },
                )}
            </h2>
            <div className="mt-5 space-y-4">
                {user.role === 'parent' ? (
                    claims.length === 0 ? (
                        <p className="text-sm text-slate-400">
                            {intl.formatMessage({
                                id: 'claims.pending.empty',
                                defaultMessage: 'No pending claims right now.',
                            })}
                        </p>
                    ) : (
                        claims.map((claim) => (
                            <div key={claim.id} className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                    <div>
                                        <p className="text-lg font-semibold text-white">{claim.chore?.title}</p>
                                        <p className="mt-1 text-sm text-slate-400">
                                            {intl.formatMessage(
                                                {
                                                    id: 'claims.card.summary',
                                                    defaultMessage: '{name} • {points} pts',
                                                },
                                                {
                                                    name: claim.user?.name,
                                                    points: claim.chore?.pointsValue,
                                                },
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                runAction(`claim:approve:${claim.id}`, () =>
                                                    apiRequest(`/api/claims/${claim.id}/approve`, { method: 'POST' }),
                                                )
                                            }
                                            disabled={busyKey === `claim:approve:${claim.id}`}
                                            className="rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/25 disabled:opacity-50"
                                        >
                                            {intl.formatMessage({
                                                id: 'claims.action.approve',
                                                defaultMessage: 'Approve',
                                            })}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                runAction(`claim:reject:${claim.id}`, () =>
                                                    apiRequest(`/api/claims/${claim.id}/reject`, { method: 'POST' }),
                                                )
                                            }
                                            disabled={busyKey === `claim:reject:${claim.id}`}
                                            className="rounded-full bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/20 disabled:opacity-50"
                                        >
                                            {intl.formatMessage({
                                                id: 'claims.action.reject',
                                                defaultMessage: 'Reject',
                                            })}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                        {rewards.map((reward) => (
                            <div key={reward.id} className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-lg font-semibold text-white">{reward.name}</p>
                                        <p className="mt-2 text-sm text-slate-400">
                                            {intl.formatMessage(
                                                {
                                                    id: 'rewards.duration',
                                                    defaultMessage: '{minutes} minutes of access',
                                                },
                                                { minutes: reward.durationMinutes },
                                            )}
                                        </p>
                                    </div>
                                    <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">
                                        {intl.formatMessage(
                                            {
                                                id: 'common.pointsShort',
                                                defaultMessage: '{value} pts',
                                            },
                                            { value: reward.pointsCost },
                                        )}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        runAction(`reward:${reward.id}`, () =>
                                            apiRequest(`/api/rewards/${reward.id}/redeem`, { method: 'POST' }),
                                        )
                                    }
                                    disabled={busyKey === `reward:${reward.id}` || user.pointsBalance < reward.pointsCost}
                                    className="mt-5 rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-40"
                                >
                                    {intl.formatMessage({
                                        id: 'rewards.action.redeem',
                                        defaultMessage: 'Redeem reward',
                                    })}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </motion.section>
    );
}

export default ActionCenter;
