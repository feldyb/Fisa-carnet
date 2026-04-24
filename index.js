import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './style.css';

window.onerror = function(msg, src, line, col, err) {
  document.body.innerHTML = '<div style="padding:20px;color:red;font-size:16px;">' +
    '<h2>EROARE</h2>' +
    '<p>' + msg + '</p>' +
    '<p>Fisier: ' + src + '</p>' +
    '<p>Linia: ' + line + '</p>' +
    '<pre>' + (err ? err.stack : '') + '</pre>' +
    '</div>';
};

window.onunhandledrejection = function(e) {
  document.body.innerHTML = '<div style="padding:20px;color:red;font-size:16px;">' +
    '<h2>EROARE PROMISE</h2>' +
    '<pre>' + e.reason + '</pre>' +
    '</div>';
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
