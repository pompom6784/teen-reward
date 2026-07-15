import { motion } from 'framer-motion';
import { useIntl } from 'react-intl';
import { apiRequest } from '../../spa/api';
import { cardVariants, formatRecurrence } from '../../spa/utils';

function ChoreBoard({
    busyKey,
    chores,
    editingChoreId,
    beginEditChore,
    resetChoreForm,
    runAction,
    user,
}) {
    const intl = useIntl();

    return (
        <motion.section
            initial="hidden"
            animate="visible"
            variants={cardVariants(0.1)}
            className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 backdrop-blur"
        >
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">
                        {intl.formatMessage(
                            user.role === 'parent'
                                ? {
                                    id: 'chores.section.title.parent',
                                    defaultMessage: 'Chore management',
                                }
                                : {
                                    id: 'chores.section.title.teen',
                                    defaultMessage: 'Available chores',
                                },
                        )}
                    </h2>
                    <p className="mt-1 text-sm text-slate-400">
                        {intl.formatMessage(
                            user.role === 'parent'
                                ? {
                                    id: 'chores.section.subtitle.parent',
                                    defaultMessage: 'Create, update, and retire chores without leaving the SPA.',
                                }
                                : {
                                    id: 'chores.section.subtitle.teen',
                                    defaultMessage: 'Claim work for the current recurrence window.',
                                },
                        )}
                    </p>
                </div>
                {user.role === 'parent' && editingChoreId ? (
                    <button
                        type="button"
                        onClick={resetChoreForm}
                        className="rounded-full border border-slate-600 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400 hover:text-cyan-200"
                    >
                        {intl.formatMessage({
                            id: 'chores.action.cancelEdit',
                            defaultMessage: 'Cancel edit',
                        })}
                    </button>
                ) : null}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {chores.map((chore) => (
                    <motion.article
                        key={chore.id}
                        whileHover={{ y: -4 }}
                        className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-semibold text-white">{chore.title}</h3>
                                <p className="mt-2 text-sm text-slate-400">
                                    {chore.description || intl.formatMessage({
                                        id: 'chores.emptyDescription',
                                        defaultMessage: 'No description yet.',
                                    })}
                                </p>
                            </div>
                            <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-sm font-semibold text-cyan-200">
                                {intl.formatMessage(
                                    {
                                        id: 'common.pointsShort',
                                        defaultMessage: '{value} pts',
                                    },
                                    { value: chore.pointsValue },
                                )}
                            </span>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
                            <span className="rounded-full border border-slate-700 px-3 py-1">
                                {formatRecurrence(intl, chore)}
                            </span>
                            {user.role === 'parent' ? (
                                <span className="rounded-full border border-slate-700 px-3 py-1">
                                    {intl.formatMessage(
                                        chore.active
                                            ? { id: 'chores.status.active', defaultMessage: 'Active' }
                                            : { id: 'chores.status.inactive', defaultMessage: 'Inactive' },
                                    )}
                                </span>
                            ) : null}
                        </div>

                        <div className="mt-5 flex gap-3">
                            {user.role === 'parent' ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => beginEditChore(chore)}
                                        className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15"
                                    >
                                        {intl.formatMessage({
                                            id: 'chores.action.edit',
                                            defaultMessage: 'Edit',
                                        })}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            runAction(`chore:delete:${chore.id}`, () =>
                                                apiRequest(`/api/chores/${chore.id}`, { method: 'DELETE' }),
                                            )
                                        }
                                        disabled={busyKey === `chore:delete:${chore.id}`}
                                        className="rounded-full bg-rose-500/10 px-4 py-2 text-sm font-medium text-rose-200 transition hover:bg-rose-500/20 disabled:opacity-50"
                                    >
                                        {intl.formatMessage({
                                            id: 'chores.action.delete',
                                            defaultMessage: 'Delete',
                                        })}
                                    </button>
                                </>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() =>
                                        runAction(`claim:${chore.id}`, () =>
                                            apiRequest(`/api/chores/${chore.id}/claim`, { method: 'POST' }),
                                        )
                                    }
                                    disabled={busyKey === `claim:${chore.id}`}
                                    className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
                                >
                                    {intl.formatMessage({
                                        id: 'chores.action.claim',
                                        defaultMessage: 'Claim chore',
                                    })}
                                </button>
                            )}
                        </div>
                    </motion.article>
                ))}
            </div>
        </motion.section>
    );
}

export default ChoreBoard;
