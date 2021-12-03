import ContainerUtil from "../utils/ContainerUtil"
import Box from "@mui/material/Box"
import { Link } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext"

const Header = () => {
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
          <Link to='/'>PostsManager</Link>
          <nav className='main-nav'>
            <ul>
              <li className='link-item'>
                <Link to='/'>My posts</Link>
              </li>
              <li className='link-item'>
                <Link to='/'>Add post</Link>
              </li>
            </ul>
          </nav>
          <div className='user-section'>
            <Link to='/'>User</Link>
            <Link to='/sign-in'>Sign in</Link>
          </div>
        </Box>
      </ContainerUtil>
    </header>
  )
}

export default Header
