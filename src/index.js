import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizar la aplicación dentro de BrowserRouter para usar el enrutamiento
root.render(
  //<React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  //</React.StrictMode>
);