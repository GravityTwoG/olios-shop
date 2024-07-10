import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import './main.css';
import '@olios-shop/ui/theme.css';

import { App } from './app/app';

function bootstrap() {
  const element = document.getElementById('root');
  if (!element) {
    alert('Failed to find the root element');
    return;
  }

  const root = ReactDOM.createRoot(element);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

bootstrap();
