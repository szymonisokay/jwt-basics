import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './context/authContext';
import { AppRequestsProvider } from './context/appRequestsContext';
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <Router>

    <AuthProvider>
      <AppRequestsProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </AppRequestsProvider>
    </AuthProvider>

  </Router>,
  document.getElementById('root')
);

