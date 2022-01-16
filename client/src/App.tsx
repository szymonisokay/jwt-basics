import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Header from './components/header/Header'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AddPost from './pages/AddPost'
import EditPost from './pages/EditPost'

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/sign-in' element={<Login />} />
        <Route path='/sign-up' element={<Register />} />
        <Route path='/add-post' element={<AddPost />} />
        <Route path='/edit-post/:id' element={<EditPost />} />
      </Routes>
    </Router>
  )
}

export default App
