import { motion } from 'framer-motion';
import { useIntl } from 'react-intl';
import Input from '../../components/forms/Input';
import Select from '../../components/forms/Select';
import Textarea from '../../components/forms/Textarea';
import { cardVariants, firstError } from '../../spa/utils';

function ParentChoreForm({
    busyKey,
    choreErrors,
    choreForm,
    editingChoreId,
    setChoreForm,
    submitChore,
    updateForm,
}) {
    const intl = useIntl();

    return (
        <motion.section
            initial="hidden"
            animate="visible"
            variants={cardVariants(0.15)}
            className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 backdrop-blur"
        >
            <h2 className="text-2xl font-bold text-white">
                {intl.formatMessage(
                    editingChoreId
                        ? { id: 'chores.form.title.edit', defaultMessage: 'Edit chore' }
                        : { id: 'chores.form.title.create', defaultMessage: 'Create a chore' },
                )}
            </h2>
            <form className="mt-6 space-y-4" onSubmit={submitChore}>
                <Input
                    label={intl.formatMessage({
                        id: 'field.title',
                        defaultMessage: 'Title',
                    })}
                    value={choreForm.title}
                    error={firstError(choreErrors, 'title')}
                    onChange={(event) => updateForm(setChoreForm, 'title', event.target.value)}
                />
                <Textarea
                    label={intl.formatMessage({
                        id: 'field.description',
                        defaultMessage: 'Description',
                    })}
                    value={choreForm.description}
                    error={firstError(choreErrors, 'description')}
                    onChange={(event) => updateForm(setChoreForm, 'description', event.target.value)}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                        label={intl.formatMessage({
                            id: 'field.points',
                            defaultMessage: 'Points',
                        })}
                        type="number"
                        min="0"
                        value={choreForm.points_value}
                        error={firstError(choreErrors, 'points_value')}
                        onChange={(event) => updateForm(setChoreForm, 'points_value', Number(event.target.value))}
                    />
                    <Select
                        label={intl.formatMessage({
                            id: 'field.recurrence',
                            defaultMessage: 'Recurrence',
                        })}
                        value={choreForm.recurrence_type}
                        error={firstError(choreErrors, 'recurrence_type')}
                        onChange={(event) => updateForm(setChoreForm, 'recurrence_type', event.target.value)}
                    >
                        <option value="none">
                            {intl.formatMessage({
                                id: 'recurrence.none',
                                defaultMessage: 'One-time',
                            })}
                        </option>
                        <option value="daily">
                            {intl.formatMessage({
                                id: 'recurrence.daily',
                                defaultMessage: 'Daily',
                            })}
                        </option>
                        <option value="weekly">
                            {intl.formatMessage({
                                id: 'recurrence.weekly',
                                defaultMessage: 'Weekly',
                            })}
                        </option>
                        <option value="monthly">
                            {intl.formatMessage({
                                id: 'recurrence.monthly',
                                defaultMessage: 'Monthly',
                            })}
                        </option>
                        <option value="custom">
                            {intl.formatMessage({
                                id: 'recurrence.custom',
                                defaultMessage: 'Custom',
                            })}
                        </option>
                    </Select>
                </div>

                {choreForm.recurrence_type === 'custom' ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Input
                            label={intl.formatMessage({
                                id: 'field.interval',
                                defaultMessage: 'Interval',
                            })}
                            type="number"
                            min="1"
                            value={choreForm.recurrence_interval}
                            error={firstError(choreErrors, 'recurrence_interval')}
                            onChange={(event) => updateForm(setChoreForm, 'recurrence_interval', Number(event.target.value))}
                        />
                        <Select
                            label={intl.formatMessage({
                                id: 'field.unit',
                                defaultMessage: 'Unit',
                            })}
                            value={choreForm.recurrence_unit}
                            error={firstError(choreErrors, 'recurrence_unit')}
                            onChange={(event) => updateForm(setChoreForm, 'recurrence_unit', event.target.value)}
                        >
                            <option value="days">
                                {intl.formatMessage({
                                    id: 'unit.days',
                                    defaultMessage: 'Days',
                                })}
                            </option>
                            <option value="weeks">
                                {intl.formatMessage({
                                    id: 'unit.weeks',
                                    defaultMessage: 'Weeks',
                                })}
                            </option>
                            <option value="months">
                                {intl.formatMessage({
                                    id: 'unit.months',
                                    defaultMessage: 'Months',
                                })}
                            </option>
                        </Select>
                    </div>
                ) : null}

                <label className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3">
                    <input
                        type="checkbox"
                        checked={choreForm.active}
                        onChange={(event) => updateForm(setChoreForm, 'active', event.target.checked)}
                        className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-cyan-400 focus:ring-cyan-400"
                    />
                    <span className="text-sm text-slate-200">
                        {intl.formatMessage({
                            id: 'chores.form.visibleToTeens',
                            defaultMessage: 'Visible to teens',
                        })}
                    </span>
                </label>

                <button
                    type="submit"
                    disabled={busyKey === (editingChoreId ? `chore:update:${editingChoreId}` : 'chore:create')}
                    className="w-full rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
                >
                    {intl.formatMessage(
                        editingChoreId
                            ? { id: 'chores.form.submit.save', defaultMessage: 'Save chore' }
                            : { id: 'chores.form.submit.create', defaultMessage: 'Create chore' },
                    )}
                </button>
            </form>
        </motion.section>
    );
}

export default ParentChoreForm;
