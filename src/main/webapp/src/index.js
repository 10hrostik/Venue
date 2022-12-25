import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import MenuHeader from './scripts/menu/Header';
import reportWebVitals from './scripts/reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MenuHeader />
  </React.StrictMode>
);

reportWebVitals();
