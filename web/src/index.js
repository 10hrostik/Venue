import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import reportWebVitals from './scripts/reportWebVitals';
import Body from './scripts/Body';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Body />
  </React.StrictMode>
);

reportWebVitals();
