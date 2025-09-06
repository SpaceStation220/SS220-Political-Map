import './styles/main.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

let app = <App />;
if (!import.meta.env.PROD) {
  app = <StrictMode>{app}</StrictMode>;
}

createRoot(document.getElementById('root')!).render(app);
