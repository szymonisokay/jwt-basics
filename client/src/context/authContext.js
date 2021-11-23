import React, { useContext, useState, useEffect, useCallback } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios"
import jwt_decode from "jwt-decode"

const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState({})

  const location = useLocation()
  const navigate = useNavigate()

  const authenticateUser = useCallback(() => {
    const { user } = JSON.parse(localStorage.getItem("user"))
    setLoggedInUser(user)
    setIsAuthenticated(true)
  }, [])

  const decodeToken = () => {
    const token = getToken()
    const { exp, id } = jwt_decode(token)

    return { exp, id }
  }

  const deleteToken = () => {
    if (!isAuthenticated) return

    localStorage.removeItem("user")
    setIsAuthenticated(false)
  }

  const setTokenAndUser = (response) => {
    const { token, id, username, email, image } = response.data.user
    localStorage.setItem(
      "user",
      JSON.stringify({
        token,
        user: { id, username, email, image },
      })
    )
  }

  const getToken = () => {
    if (!localStorage.getItem("user")) return

    const token = JSON.parse(localStorage.getItem("user")).token
    return token
  }

  const getUserID = () => {
    if (!isAuthenticated) return

    const { id } = decodeToken()
    return id
  }

  const navigateToDashboard = () => {
    setTimeout(
      () => navigate(`${location.state?.pathname || "/"}`, { replace: true }),
      1000
    )
  }

  const signIn = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      )

      setTokenAndUser(response)
      authenticateUser()
      navigateToDashboard()
      return { msg: response.data.msg, type: "success" }
    } catch (error) {
      return { msg: error.response.data.msg, type: "failed" }
    }
  }

  const signUp = async (username, email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          username,
          email,
          password,
        }
      )

      setTokenAndUser(response)

      navigateToDashboard()
      return { msg: response.data.msg, type: "success" }
    } catch (error) {
      return { msg: error.response.data.msg, type: "failed" }
    }
  }

  useEffect(() => {
    if (!getToken() && !isAuthenticated) return

    const { exp } = decodeToken()

    if (Date.now() >= exp * 1000) return deleteToken()

    authenticateUser()
  }, [setIsAuthenticated])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loggedInUser,
        setIsAuthenticated,
        signIn,
        signUp,
        deleteToken,
        getToken,
        getUserID,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}
