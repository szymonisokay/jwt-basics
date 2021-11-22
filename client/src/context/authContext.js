import React, { useContext, useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios"
import jwt_decode from "jwt-decode"

const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  const decodeToken = () => {
    if (!localStorage.getItem("user")) return

    const token = JSON.parse(localStorage.getItem("user")).token
    const { exp, id } = jwt_decode(token)

    return { exp, id }
  }

  const deleteToken = () => {
    if (!localStorage.getItem("user")) return

    localStorage.removeItem("user")
    setIsAuthenticated(false)
  }

  const setToken = (response) => {
    console.log(response)
    localStorage.setItem(
      "user",
      JSON.stringify({
        username: response.data.user.username,
        token: response.data.user.token,
      })
    )
  }

  const getToken = () => {
    if (!localStorage.getItem("user")) return

    const token = JSON.parse(localStorage.getItem("user")).token
    return token
  }

  const getUserID = () => {
    if (!localStorage.getItem("user")) return

    const { id } = decodeToken()
    return id
  }

  const navigateToDashboard = () => {
    setIsAuthenticated(true)
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

      setToken(response)

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

      setToken(response)

      navigateToDashboard()
      return { msg: response.data.msg, type: "success" }
    } catch (error) {
      return { msg: error.response.data.msg, type: "failed" }
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("user")) return

    const { exp } = decodeToken()

    if (Date.now() >= exp * 1000) return deleteToken()

    localStorage.getItem("user") && setIsAuthenticated(true)
  }, [setIsAuthenticated])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
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
