import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Header from "./components/header/Header"
import SignIn from "./pages/auth/SignIn"

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/sign-in' element={<SignIn />} />
      </Routes>
    </Router>
  )
}

export default App
