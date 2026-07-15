export function firstError(errors, field) {
    return errors[field]?.[0] ?? null;
}

export function formatDate(intl, value) {
    if (!value) {
        return intl.formatMessage({
            id: 'common.notAvailable',
            defaultMessage: '—',
        });
    }

    return intl.formatDate(new Date(value), {
        dateStyle: 'medium',
        timeStyle: 'short',
    });
}

export function formatRecurrence(intl, chore) {
    const type = chore.recurrenceType ?? chore.recurrence_type;
    const interval = chore.recurrenceInterval ?? chore.recurrence_interval;
    const unit = chore.recurrenceUnit ?? chore.recurrence_unit;

    if (type === 'custom') {
        const unitLabels = {
            days: intl.formatMessage({
                id: interval === 1 ? 'recurrence.unit.days.one' : 'recurrence.unit.days.other',
                defaultMessage: interval === 1 ? 'day' : 'days',
            }),
            weeks: intl.formatMessage({
                id: interval === 1 ? 'recurrence.unit.weeks.one' : 'recurrence.unit.weeks.other',
                defaultMessage: interval === 1 ? 'week' : 'weeks',
            }),
            months: intl.formatMessage({
                id: interval === 1 ? 'recurrence.unit.months.one' : 'recurrence.unit.months.other',
                defaultMessage: interval === 1 ? 'month' : 'months',
            }),
        };

        return intl.formatMessage(
            {
                id: 'recurrence.customPattern',
                defaultMessage: 'Every {interval} {unit}',
            },
            { interval, unit: unitLabels[unit] ?? unitLabels.days },
        );
    }

    const recurrenceMessages = {
        none: { id: 'recurrence.none', defaultMessage: 'One-time' },
        daily: { id: 'recurrence.daily', defaultMessage: 'Daily' },
        weekly: { id: 'recurrence.weekly', defaultMessage: 'Weekly' },
        monthly: { id: 'recurrence.monthly', defaultMessage: 'Monthly' },
    };

    return intl.formatMessage(recurrenceMessages[type] ?? recurrenceMessages.none);
}

export function cardVariants(delay = 0) {
    return {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.35, delay } },
    };
}
