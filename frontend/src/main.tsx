import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import { readConfig } from './lib/config/runtime';
import './styles/tokens.css';
import './styles/fonts.css';
import './styles/global.css';
import './styles/portfolio.css';
import './styles/achievements.css';
import './styles/photography.css';
import './styles/contributions.css';
import './styles/cat.css';
import './styles/primitives.css';
import './styles/reference-refinement.css';
import './styles/project-cards.css';
readConfig(import.meta.env, import.meta.env.PROD);
const root = document.getElementById('root');
if (!root) throw new Error('The page root is missing.');
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
