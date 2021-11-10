import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserPage from './pages/UserPage';
import Header from './components/Header';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} exact />
        <Route path="/auth/sign-up" element={<Register />} />
        <Route path="/auth/sign-in" element={<Login />} />
        <Route path="/users/:id" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
