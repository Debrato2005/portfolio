import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import { readConfig } from './lib/config/runtime';
import './styles/tokens.css';
import './styles/fonts.css';
import './styles/base.css';
import './styles/home.css';
import './styles/contributions.css';
import './styles/photography.css';
import './styles/cat.css';
readConfig(import.meta.env, import.meta.env.PROD);
window.history.scrollRestoration = 'manual';
const resetHomeOnLoad = () => {
  if (window.location.pathname !== '/') return;
  window.history.replaceState(
    window.history.state,
    '',
    `${window.location.pathname}${window.location.search}`,
  );
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
};
resetHomeOnLoad();
window.addEventListener('pageshow', () => {
  window.requestAnimationFrame(resetHomeOnLoad);
});
const root = document.getElementById('root');
if (!root) throw new Error('The page root is missing.');
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
