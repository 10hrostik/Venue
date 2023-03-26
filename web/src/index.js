import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Header from './scripts/menu/Header';
import Footer from './scripts/menu/Footer';
import reportWebVitals from './scripts/reportWebVitals';
import fullHeight from './scripts/utils/BlockHeights';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <div style={{height: fullHeight.bodyHeight}}></div>
    <Footer />
  </React.StrictMode>
);

reportWebVitals();
