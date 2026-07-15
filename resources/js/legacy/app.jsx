import React from 'react';
import { createRoot } from 'react-dom/client';
import SpaApp from './SpaApp';

const locale = detectLocale();

createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <SpaApp /> 
    </React.StrictMode>,
);
