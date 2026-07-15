import React from 'react'
import { createRoot } from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import SpaApp from './SpaApp';
import { detectLocale, messages } from './i18n/messages';

const locale = detectLocale();
const container = document.getElementById('app');

if (!container) {
    throw new Error('App root element "#app" was not found.');
}

createRoot(container).render(
    <React.StrictMode>
        <IntlProvider locale={locale} messages={messages[locale]}>
            <SpaApp />
        </IntlProvider>
    </React.StrictMode>,
);