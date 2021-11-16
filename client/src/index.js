import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './context/authContext';
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <Router>
    <AuthProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthProvider>
  </Router>,
  document.getElementById('root')
);

