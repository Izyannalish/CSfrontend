import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import your global CSS (including Tailwind)
import App from './App.jsx'; // Import your App component

// Find the root element in index.html and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
