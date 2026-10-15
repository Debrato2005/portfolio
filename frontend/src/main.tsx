import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/space-grotesk/latin-600.css';
import '@fontsource/space-mono/latin-400.css';
import { App } from './app/App';
import { readConfig } from './lib/config/runtime';
import './styles/tokens.css';
import './styles/global.css';
import './styles/portfolio.css';
import './styles/achievements.css';
import './styles/photography.css';
import './styles/contributions.css';
import './styles/cat.css';
import './styles/reference-refinement.css';
readConfig(import.meta.env, import.meta.env.PROD);
const root = document.getElementById('root');
if (!root) throw new Error('The page root is missing.');
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
