import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UniverseProvider } from 'shared/context/UniverseContext';

ReactDOM.render(
  <React.StrictMode>
    <UniverseProvider>
      <App />
    </UniverseProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
