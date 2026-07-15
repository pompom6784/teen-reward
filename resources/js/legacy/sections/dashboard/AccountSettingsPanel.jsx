import { motion } from 'framer-motion';
import { useIntl } from 'react-intl';
import Input from '../../components/forms/Input';
import { apiRequest } from '../../spa/api';
import { cardVariants, firstError } from '../../spa/utils';

function AccountSettingsPanel({
    busyKey,
    deleteAccount,
    deleteErrors,
    deletePassword,
    profileErrors,
    profileForm,
    passwordErrors,
    passwordForm,
    runAction,
    setDeletePassword,
    setPasswordForm,
    setProfileForm,
    updateForm,
    updatePassword,
    updateProfile,
}) {
    const intl = useIntl();

    return (
        <motion.section
            initial="hidden"
            animate="visible"
            variants={cardVariants(0.25)}
            className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 backdrop-blur"
        >
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                    {intl.formatMessage({
                        id: 'account.title',
                        defaultMessage: 'Account settings',
                    })}
                </h2>
                <button
                    type="button"
                    onClick={() => runAction('auth:logout', () => apiRequest('/api/logout', { method: 'POST' }))}
                    disabled={busyKey === 'auth:logout'}
                    className="rounded-full border border-slate-600 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400 hover:text-cyan-200 disabled:opacity-50"
                >
                    {intl.formatMessage({
                        id: 'auth.action.logout',
                        defaultMessage: 'Log out',
                    })}
                </button>
            </div>

            <div className="mt-6 space-y-8">
                <form className="space-y-4" onSubmit={updateProfile}>
                    <Input
                        label={intl.formatMessage({
                            id: 'auth.label.name',
                            defaultMessage: 'Name',
                        })}
                        value={profileForm.name}
                        error={firstError(profileErrors, 'name')}
                        onChange={(event) => updateForm(setProfileForm, 'name', event.target.value)}
                    />
                    <Input
                        label={intl.formatMessage({
                            id: 'auth.label.email',
                            defaultMessage: 'Email',
                        })}
                        type="email"
                        value={profileForm.email}
                        error={firstError(profileErrors, 'email')}
                        onChange={(event) => updateForm(setProfileForm, 'email', event.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={busyKey === 'profile:update'}
                        className="rounded-2xl bg-white/10 px-4 py-3 font-semibold text-white transition hover:bg-white/15 disabled:opacity-50"
                    >
                        {intl.formatMessage({
                            id: 'account.action.saveProfile',
                            defaultMessage: 'Save profile',
                        })}
                    </button>
                </form>

                <form className="space-y-4 border-t border-white/10 pt-8" onSubmit={updatePassword}>
                    <Input
                        label={intl.formatMessage({
                            id: 'account.label.currentPassword',
                            defaultMessage: 'Current password',
                        })}
                        type="password"
                        value={passwordForm.current_password}
                        error={firstError(passwordErrors, 'current_password')}
                        onChange={(event) => updateForm(setPasswordForm, 'current_password', event.target.value)}
                    />
                    <Input
                        label={intl.formatMessage({
                            id: 'account.label.newPassword',
                            defaultMessage: 'New password',
                        })}
                        type="password"
                        value={passwordForm.password}
                        error={firstError(passwordErrors, 'password')}
                        onChange={(event) => updateForm(setPasswordForm, 'password', event.target.value)}
                    />
                    <Input
                        label={intl.formatMessage({
                            id: 'account.label.confirmPassword',
                            defaultMessage: 'Confirm password',
                        })}
                        type="password"
                        value={passwordForm.password_confirmation}
                        error={firstError(passwordErrors, 'password_confirmation')}
                        onChange={(event) => updateForm(setPasswordForm, 'password_confirmation', event.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={busyKey === 'profile:password'}
                        className="rounded-2xl bg-white/10 px-4 py-3 font-semibold text-white transition hover:bg-white/15 disabled:opacity-50"
                    >
                        {intl.formatMessage({
                            id: 'account.action.updatePassword',
                            defaultMessage: 'Update password',
                        })}
                    </button>
                </form>

                <form className="space-y-4 border-t border-white/10 pt-8" onSubmit={deleteAccount}>
                    <Input
                        label={intl.formatMessage({
                            id: 'account.label.deletePassword',
                            defaultMessage: 'Confirm password to delete account',
                        })}
                        type="password"
                        value={deletePassword}
                        error={firstError(deleteErrors, 'password')}
                        onChange={(event) => setDeletePassword(event.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={busyKey === 'profile:delete'}
                        className="rounded-2xl bg-rose-500/15 px-4 py-3 font-semibold text-rose-200 transition hover:bg-rose-500/25 disabled:opacity-50"
                    >
                        {intl.formatMessage({
                            id: 'account.action.deleteAccount',
                            defaultMessage: 'Delete account',
                        })}
                    </button>
                </form>
            </div>
        </motion.section>
    );
}

export default AccountSettingsPanel;
