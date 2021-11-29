import React from "react"
import styled from "styled-components"
import { Link, useNavigate, useLocation } from "react-router-dom"
// Logo
import { ReactComponent as Logo } from "../images/Logo.svg"
import UserInfo from "./UserInfo"
// Context
import { useAuthContext } from "../context/authContext"

const HeaderMain = styled.header`
  width: 100%;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  background: #bfffe5;
`

const HeaderContainer = styled.div`
  max-width: 1300px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`

const NavContainer = styled.nav`
  display: flex;
  gap: 1rem;
`

const NavItem = styled.span`
  color: #0a0e0c;

  a {
    color: inherit;
    text-decoration: none;
    position: relative;
  }

  a:after {
    content: "";
    width: 0px;
    height: 4px;
    background: #307452;
    position: absolute;
    bottom: -5px;
    left: 0;
    border-radius: 5px;

    transition: width 0.3s linear;
  }

  &:hover a:after {
    width: 100%;
  }
`

const UserContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`

const LogOut = styled.span`
  cursor: pointer;
  transition: color 0.3s linear;

  &:hover {
    color: #777;
  }
`

const Header = () => {
  const { isAuthenticated, deleteToken } = useAuthContext()

  const navigate = useNavigate()
  const location = useLocation()

  const logOutUser = (e) => {
    e.preventDefault()
    deleteToken()
    navigate("/auth/sign-in", { replace: true, state: location })
  }

  return (
    <HeaderMain>
      <HeaderContainer>
        <Link
          onClick={(e) => {
            e.preventDefault()
            navigate("/")
          }}
          to="/"
        >
          <Logo className="logo" />
        </Link>
        <NavContainer>
          <NavItem>
            <Link to="/my-posts">Your posts</Link>
          </NavItem>
          <NavItem>
            <Link to="/add-post">Add post</Link>
          </NavItem>
        </NavContainer>
        <UserContainer>
          {isAuthenticated && <UserInfo />}
          {isAuthenticated ? (
            <LogOut onClick={logOutUser}>Log out</LogOut>
          ) : (
            <Link to="/auth/sign-in">Log in</Link>
          )}
        </UserContainer>
      </HeaderContainer>
    </HeaderMain>
  )
}

export default Header
