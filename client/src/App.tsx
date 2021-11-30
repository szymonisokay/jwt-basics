import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Header from "./components/header/Header"

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
