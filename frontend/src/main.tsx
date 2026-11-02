import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import { readConfig } from './lib/config/runtime';
import '@fontsource-variable/fraunces/full.css';
import '@fontsource-variable/fraunces/full-italic.css';
import '@fontsource-variable/instrument-sans/index.css';
import '@fontsource/space-mono/latin-400.css';
import '@fontsource/space-mono/latin-700.css';
import './styles/paper.css';
readConfig(import.meta.env, import.meta.env.PROD);
const root = document.getElementById('root');
if (!root) throw new Error('The page root is missing.');
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
