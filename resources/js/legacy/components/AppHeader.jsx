import { motion } from 'framer-motion';
import { useIntl } from 'react-intl';
import { cardVariants } from '../spa/utils';

function AppHeader({ user, notice, panelError }) {
    const intl = useIntl();

    const roleLabel = user?.role
        ? intl.formatMessage(
            user.role === 'parent'
                ? { id: 'app.role.parent', defaultMessage: 'Parent' }
                : { id: 'app.role.teen', defaultMessage: 'Teen' },
        )
        : null;

    return (
        <motion.header
            initial="hidden"
            animate="visible"
            variants={cardVariants()}
            className="mb-10 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-cyan-950/30 backdrop-blur"
        >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">
                        {intl.formatMessage({
                            id: 'app.brand',
                            defaultMessage: 'Teen Reward',
                        })}
                    </p>
                    <h1 className="mt-3 text-4xl font-black tracking-tight text-white">
                        {intl.formatMessage({
                            id: 'app.hero.title',
                            defaultMessage: 'React SPA for the family rewards loop',
                        })}
                    </h1>
                    <p className="mt-3 max-w-2xl text-slate-300">
                        {intl.formatMessage({
                            id: 'app.hero.subtitle',
                            defaultMessage: 'Parents create chores, teens claim and redeem rewards, and Laravel now stays behind a clean JSON API.',
                        })}
                    </p>
                </div>

                {user ? (
                    <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-4 text-right">
                        <p className="text-sm text-cyan-200">{roleLabel}</p>
                        <p className="text-xl font-bold text-white">{user.name}</p>
                        <p className="text-sm text-slate-300">{user.email}</p>
                    </div>
                ) : null}
            </div>

            {(notice || panelError) ? (
                <div className={`rounded-2xl px-4 py-3 text-sm ${notice ? 'bg-emerald-500/10 text-emerald-200' : 'bg-rose-500/10 text-rose-200'}`}>
                    {notice || panelError}
                </div>
            ) : null}
        </motion.header>
    );
}

export default AppHeader;
