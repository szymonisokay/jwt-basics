import { Routes, Route } from 'react-router-dom'
import './App.css'
import GlobalStyle from './globalStyles';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserPage from './pages/UserPage';
import Header from './components/Header';
import AddPost from './pages/AddPost';
import RequireAuth from './components/RequireAuth';
import MyPosts from './pages/MyPosts';
import EditPost from './pages/EditPost';


function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} exact />
        {/* Auth routes */}
        <Route path="/auth/sign-up" element={<Register />} />
        <Route path="/auth/sign-in" element={<Login />} />
        {/* Pages */}
        <Route path="/add-post" element={
          <RequireAuth>
            <AddPost />
          </RequireAuth>} />
        <Route path="/my-posts" element={
          <RequireAuth>
            <MyPosts />
          </RequireAuth>} />
        <Route path="/edit-post/:id" element={
          <RequireAuth>
            <EditPost />
          </RequireAuth>} />
        <Route path="/users/:id" element={<UserPage />} />
      </Routes>
    </>

  );
}

export default App;
