import { motion } from 'framer-motion';
import { useIntl } from 'react-intl';
import Input from '../components/forms/Input';
import Select from '../components/forms/Select';
import { spaHighlights } from '../spa/constants';
import { cardVariants, firstError } from '../spa/utils';

function AuthScreen({
    authMode,
    authForm,
    authErrors,
    busyKey,
    submitAuth,
    toggleAuthMode,
    updateForm,
    setAuthForm,
}) {
    const intl = useIntl();

    return (
        <motion.main
            key="auth"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="mx-auto max-w-5xl"
        >
            <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants(0.05)}
                    className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 backdrop-blur"
                >
                    <div className="inline-flex rounded-full border border-white/10 bg-slate-950/60 p-1">
                        <button
                            type="button"
                            onClick={() => toggleAuthMode('login')}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition ${authMode === 'login' ? 'bg-cyan-400 text-slate-950' : 'text-slate-300'}`}
                        >
                            {intl.formatMessage({
                                id: 'auth.tab.login',
                                defaultMessage: 'Login',
                            })}
                        </button>
                        <button
                            type="button"
                            onClick={() => toggleAuthMode('register')}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition ${authMode === 'register' ? 'bg-cyan-400 text-slate-950' : 'text-slate-300'}`}
                        >
                            {intl.formatMessage({
                                id: 'auth.tab.register',
                                defaultMessage: 'Register',
                            })}
                        </button>
                    </div>

                    <h2 className="mt-6 text-3xl font-black text-white">
                        {intl.formatMessage(
                            authMode === 'login'
                                ? {
                                    id: 'auth.title.login',
                                    defaultMessage: 'Sign back in',
                                }
                                : {
                                    id: 'auth.title.register',
                                    defaultMessage: 'Create a household account',
                                },
                        )}
                    </h2>
                    <p className="mt-3 text-slate-400">
                        {intl.formatMessage({
                            id: 'auth.subtitle',
                            defaultMessage: 'The React client talks to Laravel through JSON endpoints while keeping familiar session-based auth.',
                        })}
                    </p>

                    <form className="mt-8 space-y-4" onSubmit={submitAuth}>
                        {authMode === 'register' ? (
                            <>
                                <Input
                                    label={intl.formatMessage({
                                        id: 'auth.label.name',
                                        defaultMessage: 'Name',
                                    })}
                                    value={authForm.name}
                                    error={firstError(authErrors, 'name')}
                                    onChange={(event) => updateForm(setAuthForm, 'name', event.target.value)}
                                />
                                <Select
                                    label={intl.formatMessage({
                                        id: 'auth.label.role',
                                        defaultMessage: 'Role',
                                    })}
                                    value={authForm.role}
                                    error={firstError(authErrors, 'role')}
                                    onChange={(event) => updateForm(setAuthForm, 'role', event.target.value)}
                                >
                                    <option value="teen">
                                        {intl.formatMessage({
                                            id: 'auth.role.teen',
                                            defaultMessage: 'Teen',
                                        })}
                                    </option>
                                    <option value="parent">
                                        {intl.formatMessage({
                                            id: 'auth.role.parent',
                                            defaultMessage: 'Parent',
                                        })}
                                    </option>
                                </Select>
                            </>
                        ) : null}

                        <Input
                            label={intl.formatMessage({
                                id: 'auth.label.email',
                                defaultMessage: 'Email',
                            })}
                            type="email"
                            value={authForm.email}
                            error={firstError(authErrors, 'email')}
                            onChange={(event) => updateForm(setAuthForm, 'email', event.target.value)}
                        />
                        <Input
                            label={intl.formatMessage({
                                id: 'auth.label.password',
                                defaultMessage: 'Password',
                            })}
                            type="password"
                            value={authForm.password}
                            error={firstError(authErrors, 'password')}
                            onChange={(event) => updateForm(setAuthForm, 'password', event.target.value)}
                        />
                        {authMode === 'register' ? (
                            <Input
                                label={intl.formatMessage({
                                    id: 'auth.label.passwordConfirmation',
                                    defaultMessage: 'Confirm password',
                                })}
                                type="password"
                                value={authForm.password_confirmation}
                                error={firstError(authErrors, 'password_confirmation')}
                                onChange={(event) => updateForm(setAuthForm, 'password_confirmation', event.target.value)}
                            />
                        ) : null}

                        <button
                            type="submit"
                            disabled={busyKey === `auth:${authMode}`}
                            className="w-full rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
                        >
                            {intl.formatMessage(
                                authMode === 'login'
                                    ? {
                                        id: 'auth.action.login',
                                        defaultMessage: 'Log in',
                                    }
                                    : {
                                        id: 'auth.action.register',
                                        defaultMessage: 'Create account',
                                    },
                            )}
                        </button>
                    </form>
                </motion.section>

                <motion.aside
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants(0.1)}
                    className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 backdrop-blur"
                >
                    <h2 className="text-2xl font-bold text-white">
                        {intl.formatMessage({
                            id: 'auth.highlights.title',
                            defaultMessage: 'SPA highlights',
                        })}
                    </h2>
                    <div className="mt-6 space-y-4">
                        {spaHighlights.map((item) => (
                            <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-slate-300">
                                {intl.formatMessage(item)}
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 rounded-[1.5rem] border border-cyan-400/20 bg-cyan-400/10 p-5">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
                            {intl.formatMessage({
                                id: 'auth.seededDemo.title',
                                defaultMessage: 'Seeded demo',
                            })}
                        </p>
                        <p className="mt-3 text-white">
                            {intl.formatMessage({
                                id: 'auth.seeded.parent',
                                defaultMessage: 'parent@example.com / password',
                            })}
                        </p>
                        <p className="mt-1 text-white">
                            {intl.formatMessage({
                                id: 'auth.seeded.teen',
                                defaultMessage: 'teen@example.com / password',
                            })}
                        </p>
                    </div>
                </motion.aside>
            </div>
        </motion.main>
    );
}

export default AuthScreen;
