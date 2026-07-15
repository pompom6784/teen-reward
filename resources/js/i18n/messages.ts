import frMessages from './fr.json';

const supportedLocales = ['en', 'fr'] as const;
export type Locale = (typeof supportedLocales)[number];
type LocaleMessages = Record<string, string>;

function isSupportedLocale(locale: string): locale is Locale {
    return (supportedLocales as readonly string[]).includes(locale);
}

function normalizeLocale(locale: string | undefined): Locale {
    const language = (locale ?? 'en').split('-')[0].toLowerCase();

    return isSupportedLocale(language) ? language : 'en';
}

export function detectLocale(): Locale {
    if (typeof navigator !== 'undefined' && navigator.language) {
        return normalizeLocale(navigator.language);
    }

    if (typeof document !== 'undefined' && document.documentElement?.lang) {
        return normalizeLocale(document.documentElement.lang);
    }

    return 'en';
}

export const messages: Record<Locale, LocaleMessages> = {
    en: {},
    fr: frMessages,
};
