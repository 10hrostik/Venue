import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Header from './scripts/menu/Header';
import Footer from './scripts/menu/Footer';
import reportWebVitals from './scripts/reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <div style={{height: 522}}></div>
    <Footer />
  </React.StrictMode>
);

reportWebVitals();
