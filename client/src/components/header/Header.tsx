import ContainerUtil from "../utils/ContainerUtil"
import Box from "@mui/material/Box"
import { Link } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext"
import logo from "../../images/logo-white.png"

const Header = () => {
  const { isAuthenticated, loggedInUser, signOut } = useAuthContext()

  return (
    <header className='header'>
      <ContainerUtil>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          style={{ height: "100%" }}
        >
          <Link to='/'>
            <img className='logo' src={logo} alt='PostsManager' />
          </Link>
          <nav className='main-nav'>
            <ul>
              <li className='link-item'>
                <Link to='/'>My posts</Link>
              </li>
              <li className='link-item'>
                <Link to='/add-post'>Add post</Link>
              </li>
            </ul>
          </nav>
          <div className='user-section'>
            {isAuthenticated && (
              <Link to={`/users/${loggedInUser._id}`}>
                <div>
                  <img src={loggedInUser.image} alt={loggedInUser.username} />
                  <p className='nickname'>{loggedInUser.username}</p>
                </div>
              </Link>
            )}
            {isAuthenticated ? (
              <button className='sign-out' onClick={signOut}>
                Sign Out
              </button>
            ) : (
              <Link to='/sign-in'>Sign in</Link>
            )}
          </div>
        </Box>
      </ContainerUtil>
    </header>
  )
}

export default Header
